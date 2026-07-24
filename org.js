// org.js - Handles Organization Mode Logic

// Global variables for Organization Mode
let currentOrg = null;
let appMode = localStorage.getItem('pigmie_app_mode');
let _orgMembersCache = [];

function showLoading(show) {
    let overlay = document.getElementById('loadingOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'loadingOverlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:9999;';
        overlay.innerHTML = '<div style="color:white;font-size:16px;text-align:center;"><div style="width:36px;height:36px;border:3px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto 12px;"></div>Loading...</div>';
        document.body.appendChild(overlay);
    }
    overlay.style.display = show ? 'flex' : 'none';
}

let orgCustomersUnsubscribe = null;
let orgPaymentsUnsubscribe = null;
let orgMembersUnsubscribe = null;

function detachOrgListeners() {
    if (orgCustomersUnsubscribe) { orgCustomersUnsubscribe(); orgCustomersUnsubscribe = null; }
    if (orgPaymentsUnsubscribe) { orgPaymentsUnsubscribe(); orgPaymentsUnsubscribe = null; }
    if (orgMembersUnsubscribe) { orgMembersUnsubscribe(); orgMembersUnsubscribe = null; }
    if (typeof detachApprovalsListener === 'function') { detachApprovalsListener(); }
}

let _orgRefreshTimer = null;
function debouncedRefresh() {
    if (_orgRefreshTimer) clearTimeout(_orgRefreshTimer);
    _orgRefreshTimer = setTimeout(() => {
        if (typeof refreshCurrentView === 'function') refreshCurrentView();
    }, 100);
}

function attachOrgListeners() {
    if (!currentOrg || typeof cloudDb === 'undefined' || !currentUser) return;
    
    const orgId = currentOrg.id;
    detachOrgListeners(); // ensure no duplicates
    
    _customersCache = [];
    _paymentsCache = [];
    
    const isRestricted = (currentOrgMemberRole === 'agent' || currentOrgMemberRole === 'collector');
    
    // Listen to customers
    let customersQuery = cloudDb.collection('orgs').doc(orgId).collection('customers');
    if (isRestricted) {
        customersQuery = customersQuery.where('assignedAgent', '==', currentUser.uid);
    }
    
    orgCustomersUnsubscribe = customersQuery.onSnapshot(snapshot => {
            const customers = [];
            snapshot.forEach(doc => customers.push(doc.data()));
            _customersCache = customers; // Update global cache directly
            debouncedRefresh();
        });
        
    // Listen to payments
    let paymentsQuery = cloudDb.collection('orgs').doc(orgId).collection('payments');
    if (isRestricted) {
        paymentsQuery = paymentsQuery.where('collectedBy', '==', currentUser.uid);
    }
    
    orgPaymentsUnsubscribe = paymentsQuery.onSnapshot(snapshot => {
            const payments = [];
            snapshot.forEach(doc => payments.push(doc.data()));
            _paymentsCache = payments; // Update global cache directly
            debouncedRefresh();
        });
        
    // Listen to members
    orgMembersUnsubscribe = cloudDb.collection('orgs').doc(orgId).collection('members')
        .onSnapshot(snapshot => {
            const members = [];
            snapshot.forEach(doc => members.push(doc.data()));
            _orgMembersCache = members;
            debouncedRefresh();
        });
}

function updateOrgUI() {
    // Hide "Add Customer" button for viewers
    const topAction = document.getElementById('topAction');
    if (topAction) {
        topAction.style.display = canPerform('ADD_CUSTOMER') ? 'inline-flex' : 'none';
    }
    
    // Disable Add/Edit buttons for Viewers
    const actionButtons = document.querySelectorAll('.main-content .fab, .main-content .btn-primary, .main-content .btn-success, .main-content .btn-danger, [onclick^="viewCustomerDetail"]');
    if (typeof appMode !== 'undefined' && appMode === 'org' && currentOrgMemberRole === 'viewer') {
        actionButtons.forEach(btn => btn.style.display = 'none');
    } else {
        actionButtons.forEach(btn => btn.style.display = ''); 
    }
    
    // Restrict Settings based on permissions
    const settingsItemAction = document.querySelectorAll('.settings-item-action button');
    if (!canPerform('MANAGE_SETTINGS')) {
        settingsItemAction.forEach(btn => {
            if (!btn.textContent.includes(typeof t === 'function' ? t('settingsClearAll') : 'Clear') && !btn.textContent.includes('Language')) {
                btn.disabled = true;
                btn.style.opacity = '0.5';
            }
        });
    } else {
        settingsItemAction.forEach(btn => {
            btn.disabled = false;
            btn.style.opacity = '1';
        });
    }

    // Toggle Approvals Section
    const approvalsSection = document.getElementById('approvalsSection');
    if (approvalsSection) {
        approvalsSection.style.display = canPerform('APPROVE_REQUESTS') ? 'block' : 'none';
        if (canPerform('APPROVE_REQUESTS') && typeof refreshApprovalsList === 'function') {
            refreshApprovalsList();
        }
    }
}

function refreshOrgDashboard() {
    if (!currentOrg) return;
    
    document.getElementById('orgDashName').textContent = currentOrg.name || 'Organization';
    
    // Calculate total capital from all organization customers/payments
    const customers = getCustomers();
    const payments = getPayments();
    
    let totalCollected = 0;
    if (payments && payments.length) {
        totalCollected = payments.reduce((sum, p) => sum + p.amount, 0);
    }
    document.getElementById('orgDashCapital').textContent = '₹' + Number(totalCollected).toLocaleString();

    // Render agents
    const container = document.getElementById('agentListContainer');
    if (!container) return;
    
    // Filter members based on hierarchy: 
    // Admins see everyone. Managers see Agents, Collectors, Viewers, and themselves.
    let displayMembers = _orgMembersCache;
    if (currentOrgMemberRole === 'manager') {
        displayMembers = _orgMembersCache.filter(m => m.role === 'agent' || m.role === 'collector' || m.role === 'viewer' || m.uid === currentUser?.uid);
    }

    if (displayMembers.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 32px; color: var(--text-secondary); background: var(--bg-color); border-radius: 12px; border: 1px dashed var(--border-color);">
                <p style="margin: 0;">No agents yet.</p>
            </div>
        `;
        return;
    }

    const today = getTodayStr();
    const currentMonth = today.substring(0, 7); // YYYY-MM

    container.innerHTML = displayMembers.map(member => {
        // Calculate metrics for this specific member
        const memberCustomers = customers.filter(c => c.assignedAgent === member.uid);
        const memberPayments = payments.filter(p => p.collectedBy === member.uid);
        
        const totalCustomers = memberCustomers.length;
        
        // Defaulters (Active loans with no payments in last 3 days)
        const defaulters = memberCustomers.filter(c => {
            if (c.status !== 'active') return false;
            const custPayments = memberPayments.filter(p => p.customerId === c.id);
            if (custPayments.length === 0) return true;
            
            custPayments.sort((a, b) => new Date(b.date) - new Date(a.date));
            const lastPaymentDate = new Date(custPayments[0].date);
            const now = new Date(today);
            const diffTime = Math.abs(now - lastPaymentDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays > 3;
        }).length;

        // Collections
        const todayCollection = memberPayments.filter(p => p.date === today).reduce((sum, p) => sum + p.amount, 0);
        const monthCollection = memberPayments.filter(p => p.date.startsWith(currentMonth)).reduce((sum, p) => sum + p.amount, 0);

        return `
        <div style="display: flex; flex-direction: column; padding: 16px; background: var(--bg-color); border: 1px solid var(--border-color); border-radius: 12px; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--primary-color); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px;">
                    ${(member.displayName || member.email || '?').charAt(0).toUpperCase()}
                </div>
                <div style="flex: 1;">
                    <h4 style="margin: 0; font-size: 16px;">${member.displayName || member.email}</h4>
                    <p style="margin: 0; font-size: 12px; color: var(--text-secondary); text-transform: capitalize;">Role: ${member.role}</p>
                </div>
                <button class="btn btn-outline" style="padding: 4px 8px; font-size: 12px;" onclick="viewAgentActivity('${member.uid}')">Activity</button>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <div style="background: rgba(99,102,241,0.1); padding: 10px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase; font-weight: bold;">Customers</div>
                    <div style="font-size: 16px; font-weight: bold; color: var(--text-primary);">${totalCustomers}</div>
                </div>
                <div style="background: rgba(16,185,129,0.1); padding: 10px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase; font-weight: bold;">Today's Coll.</div>
                    <div style="font-size: 16px; font-weight: bold; color: var(--text-primary);">&#8377;${todayCollection.toLocaleString()}</div>
                </div>
                <div style="background: rgba(245,158,11,0.1); padding: 10px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase; font-weight: bold;">This Month</div>
                    <div style="font-size: 16px; font-weight: bold; color: var(--text-primary);">&#8377;${monthCollection.toLocaleString()}</div>
                </div>
                <div style="background: rgba(239,68,68,0.1); padding: 10px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase; font-weight: bold;">Defaulters</div>
                    <div style="font-size: 16px; font-weight: bold; color: var(--danger-color);">${defaulters}</div>
                </div>
            </div>
        </div>`;
    }).join('');

    // Toggle Approvals Section based on role
    const approvalsSection = document.getElementById('approvalsSection');
    if (approvalsSection) {
        if (currentOrgMemberRole === 'admin' || currentOrgMemberRole === 'owner' || currentOrgMemberRole === 'manager') {
            approvalsSection.style.display = 'block';
            if (typeof refreshApprovalsList === 'function') {
                refreshApprovalsList();
            }
        } else {
            approvalsSection.style.display = 'none';
        }
    }
}

function viewAgentActivity(uid) {
    const member = _orgMembersCache.find(m => m.uid === uid);
    if (!member) return;
    
    const customers = getCustomers();
    const payments = getPayments();
    
    // Recent Payments
    let memberPayments = payments.filter(p => p.collectedBy === uid);
    memberPayments.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
    memberPayments = memberPayments.slice(0, 10);
    
    let activityHtml = memberPayments.map(p => {
        const cust = customers.find(c => c.id === p.customerId);
        const custName = cust ? cust.name : 'Unknown';
        return `<div>- Collected ₹${p.amount} from ${custName} on ${p.date}</div>`;
    }).join('');
    
    if (!activityHtml) activityHtml = "<div>No recent collection activity.</div>";
    
    alert(`Recent Activity for ${member.displayName || member.email}:\n\n` + activityHtml.replace(/<[^>]+>/g, ''));
}

// Create a new organization
async function createOrganization(orgName) {
    if (!firebase.auth().currentUser) {
        showToast(t('loginRequired'), "error");
        return null;
    }

    try {
        const uid = firebase.auth().currentUser.uid;
        const orgId = "org_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
        
        const orgData = {
            id: orgId,
            name: orgName,
            createdBy: uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            plan: "free",
            settings: {
                businessName: orgName,
                currency: "INR"
            }
        };

        const memberData = {
            uid: uid,
            email: firebase.auth().currentUser.email,
            role: "owner",
            joinedAt: firebase.firestore.FieldValue.serverTimestamp(),
            status: "active"
        };

        // Create Org document
        await firebase.firestore().collection('orgs').doc(orgId).set(orgData);
        // Add creator as member
        await firebase.firestore().collection('orgs').doc(orgId).collection('members').doc(uid).set(memberData);

        // Update user's profile to know they belong to this org
        await firebase.firestore().collection('users').doc(uid).set({
            activeOrgId: orgId,
            orgs: firebase.firestore.FieldValue.arrayUnion(orgId)
        }, { merge: true });

        showToast("Organization Created Successfully!", "success");
        return orgId;
    } catch (error) {
        console.error("Error creating org:", error);
        showToast("Failed to create organization: " + error.message, "error");
        return null;
    }
}

// Set app mode
function setAppMode(mode, targetOrgId = null) {
    appMode = mode;
    localStorage.setItem('pigmie_app_mode', mode);
    
    if (mode === 'org' && targetOrgId) {
        localStorage.setItem('pigmie_active_org', targetOrgId);
    }
    
    // Clear in-memory caches so they re-fetch from the correct source
    if (typeof _customersCache !== 'undefined') {
        _customersCache = [];
        _paymentsCache = [];
    }
    
    // Only refresh for personal mode. Org mode refreshes after async data load in selectAppMode.
    if (mode !== 'org' && typeof refreshCurrentView === 'function') {
        refreshCurrentView();
    }
}

let currentOrgMemberRole = null;

async function selectAppMode(mode, targetOrgId = null) {
    const appUI = document.getElementById('appUI');
    if (appUI) appUI.classList.add('active');
    
    if (typeof closeModeSelectModal === 'function') {
        closeModeSelectModal();
    }
    setAppMode(mode, targetOrgId);
    
    if (mode === 'org') {
        const orgId = targetOrgId || localStorage.getItem('pigmie_active_org');
        if (!orgId) {
            if (typeof showToast === 'function') showToast('No organization selected', 'error');
            return;
        }
        
        // Show loading spinner while fetching from cloud
        if (typeof showLoading === 'function') showLoading(true);
        
        try {
            // Check internet connection implicitly by awaiting Firestore
            if (typeof cloudDb === 'undefined' || !cloudDb || typeof currentUser === 'undefined' || !currentUser) {
                 throw new Error("Cloud DB or User not ready");
            }

            // STEP 1: Fetch org document from Firestore
            const orgDoc = await cloudDb.collection('orgs').doc(orgId).get();
            if (!orgDoc.exists) {
                if (typeof showToast === 'function') showToast('Organization not found', 'error');
                if (typeof showLoading === 'function') showLoading(false);
                return;
            }
            currentOrg = { id: orgDoc.id, ...orgDoc.data() };
            
            // STEP 2: Fetch user's role from Firestore
            const memberDoc = await cloudDb.collection('orgs').doc(orgId)
                .collection('members').doc(currentUser.uid).get();
            if (!memberDoc.exists) {
                if (typeof showToast === 'function') showToast('You are not a member of this organization', 'error');
                if (typeof showLoading === 'function') showLoading(false);
                return;
            }
            currentOrgMemberRole = memberDoc.data().role || 'agent';
            
            // STEP 3: Initialize personal DB (for when user switches back)
            if (typeof initDB === 'function') await initDB();
            
            // STEP 4: Attach real-time listeners (these populate _customersCache & _paymentsCache)
            attachOrgListeners();
            
            // STEP 5: Render UI
            if (typeof switchView === 'function') switchView('dashboard');
            if (typeof updateOrgUI === 'function') updateOrgUI();
            
        } catch (err) {
            console.error('[selectAppMode] Failed to load org data:', err);
            if (typeof showToast === 'function') showToast('Failed to connect. Please check your internet.', 'error');
        } finally {
            if (typeof showLoading === 'function') showLoading(false);
        }
    } else {
        // Personal mode
        currentOrgMemberRole = null;
        currentOrg = null;
        detachOrgListeners();
        // Load personal data from IndexedDB
        if (typeof initDB === 'function') {
            await initDB();
            if (typeof switchView === 'function') switchView('dashboard');
            if (typeof refreshCurrentView === 'function') refreshCurrentView();
        }
    }
}

// NEW ONBOARDING JOIN FLOW
async function requestToJoinOrgWithId(orgId) {
    if (typeof cloudDb === 'undefined' || !currentUser) {
        showToast('You must be signed in to join an organization', 'error');
        return;
    }
    
    showToast('Submitting request...', 'info');
    
    try {
        const orgDoc = await cloudDb.collection('orgs').doc(orgId).get();
        if (!orgDoc.exists) {
            showToast('Organization not found', 'error');
            return;
        }
        
        const role = localStorage.getItem('pigmie_initial_role') || 'agent';
        
        // Add user to the members collection as 'pending'
        await cloudDb.collection('orgs').doc(orgId).collection('members').doc(currentUser.uid).set({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName || currentUser.email,
            role: role,
            status: 'pending',
            joinedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // Add organization to user's profiles
        await cloudDb.collection('users').doc(currentUser.uid).set({
            activeOrgId: orgId
        }, { merge: true });
        
        // Create an approval request for the admin
        await cloudDb.collection('orgs').doc(orgId).collection('approvals').add({
            type: 'JOIN_ORG',
            payload: {
                uid: currentUser.uid,
                email: currentUser.email,
                displayName: currentUser.displayName || currentUser.email,
                role: role
            },
            requestedBy: currentUser.uid,
            status: 'pending',
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        localStorage.setItem('pigmie_active_org', orgId);
        
        document.getElementById('joinOrgUI').style.display = 'none';
        document.getElementById('pendingApprovalUI').style.display = 'flex';
        
    } catch (err) {
        console.error('Error requesting to join organization:', err);
        showToast('Error requesting to join organization', 'error');
    }
}

async function checkUserApprovalStatus(uid, role) {
    const orgId = localStorage.getItem('pigmie_active_org');
    if (!orgId) {
        return 'not_joined';
    }
    try {
        const doc = await cloudDb.collection('orgs').doc(orgId).collection('members').doc(uid).get();
        if (doc.exists) {
            const data = doc.data();
            if (data.status === 'approved' || data.status === 'active' || !data.status) {
                return 'approved';
            } else if (data.status === 'pending') {
                return 'pending';
            } else {
                return 'rejected';
            }
        } else {
            return 'not_joined';
        }
    } catch (e) {
        throw e;
    }
}

async function showInviteCode() {
    if (!currentOrg) {
        showToast('Cannot show Org ID. Org not available.', 'error');
        return;
    }
    
    // Only Admin or Owner can see Org ID to invite
    if (currentOrgMemberRole !== 'owner' && currentOrgMemberRole !== 'admin') {
        showToast('Only Admin or Owner can invite members', 'error');
        return;
    }
    
    // Attempt to copy to clipboard
    try {
        await navigator.clipboard.writeText(currentOrg.id);
        showToast(`Org ID copied to clipboard: ${currentOrg.id}`, 'success');
    } catch (err) {
        showToast(`Org ID: ${currentOrg.id}`, 'info');
    }
}

// Unified Data Layer for Phase 1
async function dbSaveCustomer(customer, skipApproval = false) {
    const isEdit = getCustomers().some(c => c.id === customer.id);
    const actionType = isEdit ? 'EDIT_CUSTOMER' : 'ADD_CUSTOMER';

    if (!skipApproval && typeof needsApproval === 'function' && needsApproval(actionType)) {
        if (typeof submitForApproval === 'function') {
            await submitForApproval(actionType, customer);
            return;
        }
    }

    const orgId = localStorage.getItem('pigmie_active_org');
    if (!orgId || typeof cloudDb === 'undefined') return;

    try {
        // Write to Firestore FIRST
        await cloudDb.collection('orgs').doc(orgId).collection('customers').doc(customer.id).set(customer);
        
        // Update in-memory cache
        const customers = getCustomers();
        const index = customers.findIndex(c => c.id === customer.id);
        if (index !== -1) customers[index] = customer;
        else customers.push(customer);
        _customersCache = customers;
        
        if (typeof logAudit === 'function') {
            logAudit(index !== -1 ? 'CUSTOMER_EDITED' : 'CUSTOMER_ADDED', customer.id, { name: customer.name });
        }
    } catch (err) {
        console.error('Failed to save customer to cloud:', err);
        if (typeof showToast === 'function') showToast('Failed to save. Check your internet connection.', 'error');
        throw err;
    }
}

async function dbDeleteCustomer(id) {
    const orgId = localStorage.getItem('pigmie_active_org');
    if (!orgId || typeof cloudDb === 'undefined') return;

    try {
        await cloudDb.collection('orgs').doc(orgId).collection('customers').doc(id).delete();
        const customers = getCustomers().filter(c => c.id !== id);
        _customersCache = customers;
    } catch (err) {
        console.error('Failed to delete customer from cloud:', err);
        if (typeof showToast === 'function') showToast('Failed to delete. Check your internet connection.', 'error');
        throw err;
    }
}

async function dbSavePayment(payment) {
    const orgId = localStorage.getItem('pigmie_active_org');
    if (!orgId || typeof cloudDb === 'undefined') return;

    try {
        await cloudDb.collection('orgs').doc(orgId).collection('payments').doc(payment.id).set(payment);
        
        const payments = getPayments();
        const index = payments.findIndex(p => p.id === payment.id);
        if (index !== -1) payments[index] = payment;
        else payments.push(payment);
        _paymentsCache = payments;
        
        if (typeof logAudit === 'function') {
            logAudit('PAYMENT_ADDED', payment.id, { amount: payment.amount });
        }
    } catch (err) {
        console.error('Failed to save payment to cloud:', err);
        if (typeof showToast === 'function') showToast('Failed to save. Check your internet connection.', 'error');
        throw err;
    }
}

async function dbDeletePayment(id, skipApproval = false) {
    const payment = getPayments().find(p => p.id === id);
    if (!skipApproval && needsApproval('DELETE_PAYMENT')) {
        if (typeof submitForApproval === 'function' && payment) {
            await submitForApproval('DELETE_PAYMENT', payment);
            return;
        }
    }

    const orgId = localStorage.getItem('pigmie_active_org');
    if (!orgId || typeof cloudDb === 'undefined') return;

    try {
        await cloudDb.collection('orgs').doc(orgId).collection('payments').doc(id).delete();
        
        const payments = getPayments().filter(p => p.id !== id);
        _paymentsCache = payments;
        
        if (typeof logAudit === 'function') {
            logAudit('PAYMENT_DELETED', id, { amount: payment ? payment.amount : 0 }); 
        }
    } catch (err) {
        console.error('Failed to delete payment from cloud:', err);
        if (typeof showToast === 'function') showToast('Failed to delete. Check your internet connection.', 'error');
        throw err;
    }
}
