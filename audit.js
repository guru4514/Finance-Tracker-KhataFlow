// audit.js - Audit Trail and Approval Workflows for Organization Mode

const AUDIT_ACTIONS = {
    CUSTOMER_ADDED: 'CUSTOMER_ADDED',
    CUSTOMER_EDITED: 'CUSTOMER_EDITED',
    PAYMENT_ADDED: 'PAYMENT_ADDED',
    PAYMENT_DELETED: 'PAYMENT_DELETED',
    LOAN_CLOSED: 'LOAN_CLOSED'
};

const APPROVAL_TYPES = {
    ADD_CUSTOMER: 'ADD_CUSTOMER',
    EDIT_CUSTOMER: 'EDIT_CUSTOMER',
    DELETE_PAYMENT: 'DELETE_PAYMENT',
    CLOSE_LOAN: 'CLOSE_LOAN',
    JOIN_ORG: 'JOIN_ORG'
};

/**
 * Logs an action to the audit trail
 * @param {string} action - One of AUDIT_ACTIONS
 * @param {string} targetId - ID of the affected document (e.g., customerId, paymentId)
 * @param {Object} details - Additional context payload
 */
async function logAudit(action, targetId, details = {}) {
    if (appMode !== 'org' || !currentOrg) return;

    try {
        const db = window.firebase.firestore();
        const logRef = db.collection('orgs').doc(currentOrg.id).collection('auditLog').doc();
        
        await logRef.set({
            id: logRef.id,
            action: action,
            targetId: targetId,
            details: details,
            by: currentUser.uid,
            timestamp: window.firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log(`[Audit] Logged ${action} for target ${targetId}`);
    } catch (err) {
        console.error("Failed to log audit:", err);
    }
}

/**
 * Submits an action to the approvals queue instead of executing it directly
 * @param {string} type - One of APPROVAL_TYPES
 * @param {Object} payload - Data required to execute the action upon approval
 */
async function submitForApproval(type, payload) {
    if (appMode !== 'org' || !currentOrg) return;

    try {
        const db = window.firebase.firestore();
        const approvalRef = db.collection('orgs').doc(currentOrg.id).collection('approvals').doc();
        
        // Enrich payload for better display in Admin Dashboard
        let enrichedPayload = { ...payload };
        if ((type === 'DELETE_PAYMENT' || type === 'CLOSE_LOAN') && payload.customerId) {
            const customer = getCustomers().find(c => c.id === payload.customerId);
            if (customer) {
                enrichedPayload.customerName = getDisplayName(customer);
            }
        }
        
        await approvalRef.set({
            id: approvalRef.id,
            type: type,
            payload: enrichedPayload,
            requestedBy: currentUser.uid,
            requestedByName: currentUser.displayName || currentUser.email || 'Unknown Agent',
            status: 'pending', // 'pending', 'approved', 'rejected'
            timestamp: window.firebase.firestore.FieldValue.serverTimestamp()
        });

        showToast(t('sentForApproval') || 'Request sent for admin approval', 'success');
        
        // Log the submission itself
        await logAudit('APPROVAL_REQUESTED', approvalRef.id, { type });
    } catch (err) {
        console.error("Failed to submit for approval:", err);
        showToast(t('error') || 'An error occurred', 'error');
        throw err;
    }
}

/**
 * Executes a payload once approved
 * @param {string} type 
 * @param {Object} payload 
 */
async function executeApprovedAction(type, payload) {
    if (type === APPROVAL_TYPES.ADD_CUSTOMER || type === APPROVAL_TYPES.EDIT_CUSTOMER) {
        if (typeof dbSaveCustomer === 'function') await dbSaveCustomer(payload, true);
    } else if (type === APPROVAL_TYPES.DELETE_PAYMENT) {
        if (typeof dbDeletePayment === 'function') await dbDeletePayment(payload.id, true);
    } else if (type === APPROVAL_TYPES.CLOSE_LOAN) {
        if (typeof dbSaveCustomer === 'function') {
            const customer = getCustomers().find(c => c.id === payload.customerId);
            if (customer) {
                customer.status = 'closed';
                customer.closedDate = getTodayStr();
                await dbSaveCustomer(customer, true);
            } else {
                console.error("Customer not found for loan closure");
            }
        }
    } else if (type === APPROVAL_TYPES.JOIN_ORG) {
        const db = window.firebase.firestore();
        await db.collection('orgs').doc(currentOrg.id).collection('members').doc(payload.uid).update({
            status: 'approved'
        });
    } else {
        throw new Error('Unknown approval type: ' + type);
    }
}

/**
 * Approves a pending request
 * @param {string} approvalId 
 */
async function approveAction(approvalId) {
    if (appMode !== 'org' || !currentOrg) return;
    
    // Only Admin/Owner/Manager can approve
    if (currentOrgMemberRole === 'agent' || currentOrgMemberRole === 'viewer' || currentOrgMemberRole === 'collector') {
        showToast(t('noPermission') || 'You do not have permission', 'error');
        return;
    }

    try {
        if (typeof showLoading === 'function') showLoading(true);
        const db = window.firebase.firestore();
        const approvalRef = db.collection('orgs').doc(currentOrg.id).collection('approvals').doc(approvalId);
        
        const doc = await approvalRef.get();
        if (!doc.exists) throw new Error('Approval request not found');
        
        const approval = doc.data();
        if (approval.status !== 'pending') {
            showToast('Request already processed', 'error');
            return;
        }

        // Execute it
        await executeApprovedAction(approval.type, approval.payload);

        // Update status
        await approvalRef.update({
            status: 'approved',
            processedBy: currentUser.uid,
            processedAt: window.firebase.firestore.FieldValue.serverTimestamp()
        });

        await logAudit('APPROVAL_GRANTED', approvalId, { type: approval.type });
        showToast('Request Approved', 'success');
        
        // Refresh UI
        refreshApprovalsList();
        
    } catch (err) {
        console.error("Approval execution failed:", err);
        showToast('Failed: ' + err.message, 'error');
    } finally {
        if (typeof showLoading === 'function') showLoading(false);
    }
}

/**
 * Rejects a pending request
 * @param {string} approvalId 
 */
async function rejectAction(approvalId) {
    if (appMode !== 'org' || !currentOrg) return;
    
    if (currentOrgMemberRole === 'agent' || currentOrgMemberRole === 'viewer' || currentOrgMemberRole === 'collector') {
        showToast(t('noPermission') || 'You do not have permission', 'error');
        return;
    }

    try {
        const db = window.firebase.firestore();
        const approvalRef = db.collection('orgs').doc(currentOrg.id).collection('approvals').doc(approvalId);
        
        const doc = await approvalRef.get();
        if (doc.exists) {
            const approval = doc.data();
            if (approval.type === APPROVAL_TYPES.JOIN_ORG) {
                await db.collection('orgs').doc(currentOrg.id).collection('members').doc(approval.payload.uid).update({
                    status: 'rejected'
                });
            }
        }
        
        await approvalRef.update({
            status: 'rejected',
            processedBy: currentUser.uid,
            processedAt: window.firebase.firestore.FieldValue.serverTimestamp()
        });

        await logAudit('APPROVAL_REJECTED', approvalId, {});
        showToast('Request Rejected', 'info');
        
        refreshApprovalsList();
    } catch (err) {
        console.error("Rejection failed:", err);
        showToast('Failed to reject', 'error');
    }
}

/**
 * Fetches and displays pending approvals in the Admin Dashboard
 */
function refreshApprovalsList() {
    if (appMode !== 'org' || !currentOrg) return;
    
    const container = document.getElementById('approvalsListContainer');
    if (!container) return;

    // Only show to privileged roles
    if (currentOrgMemberRole === 'agent' || currentOrgMemberRole === 'viewer' || currentOrgMemberRole === 'collector') {
        container.innerHTML = `<p class="text-secondary" style="text-align:center;">No permissions to view approvals.</p>`;
        return;
    }

    const db = window.firebase.firestore();
    db.collection('orgs').doc(currentOrg.id).collection('approvals')
      .where('status', '==', 'pending')
      .limit(20)
      .get()
      .then(snapshot => {
          if (snapshot.empty) {
              container.innerHTML = `<p class="text-secondary" style="text-align:center; padding: 20px;">No pending approvals.</p>`;
              return;
          }

          let html = '';
          snapshot.forEach(doc => {
              const approval = doc.data();
              const requestedBy = approval.requestedByName || _orgMembersCache?.find(m => m.uid === approval.requestedBy)?.displayName || approval.requestedBy;
              const date = approval.timestamp ? new Date(approval.timestamp.toDate()).toLocaleString() : 'Just now';
              
              let summary = '';
              if (approval.type === APPROVAL_TYPES.ADD_CUSTOMER) {
                  summary = `Add Customer: <strong>${approval.payload.name}</strong>`;
              } else if (approval.type === APPROVAL_TYPES.EDIT_CUSTOMER) {
                  summary = `Edit Customer: <strong>${approval.payload.name}</strong>`;
              } else if (approval.type === APPROVAL_TYPES.DELETE_PAYMENT) {
                  summary = `Delete Payment of <strong>${formatCurrency(approval.payload.amount)}</strong> for <strong>${approval.payload.customerName || 'Unknown Customer'}</strong>`;
              } else if (approval.type === APPROVAL_TYPES.CLOSE_LOAN) {
                  summary = `Close Loan for <strong>${approval.payload.customerName || approval.payload.customerId}</strong>`;
              } else if (approval.type === APPROVAL_TYPES.JOIN_ORG) {
                  summary = `Join Request from: <strong>${approval.payload.displayName || approval.payload.email}</strong> as <strong>${approval.payload.role}</strong>`;
              }

              html += `
                  <div class="approval-card" style="background: var(--bg-secondary); border-radius: 8px; padding: 15px; margin-bottom: 10px; border-left: 4px solid var(--warning-color);">
                      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                          <div>
                              <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 4px;">${summary}</div>
                              <div style="font-size: 12px; color: var(--text-secondary);">Requested by ${requestedBy} • ${date}</div>
                          </div>
                      </div>
                      <div style="display: flex; gap: 10px; margin-top: 10px;">
                          <button class="btn btn-outline" style="flex:1; border-color: var(--danger-color); color: var(--danger-color);" onclick="rejectAction('${doc.id}')">Reject</button>
                          <button class="btn btn-primary" style="flex:1;" onclick="approveAction('${doc.id}')">Approve</button>
                      </div>
                  </div>
              `;
          });
          container.innerHTML = html;
      })
      .catch(err => {
          console.error("Failed to load approvals", err);
          container.innerHTML = `<p class="text-danger" style="text-align:center;">Failed to load approvals.</p>`;
      });
}

/**
 * Fetches and displays recent audit logs
 */
function refreshAuditLog() {
    if (appMode !== 'org' || !currentOrg) return;
    
    const container = document.getElementById('auditLogContainer');
    if (!container) return;

    if (currentOrgMemberRole === 'agent' || currentOrgMemberRole === 'viewer' || currentOrgMemberRole === 'collector') {
        container.innerHTML = `<p class="text-secondary" style="text-align:center;">No permissions to view audit log.</p>`;
        return;
    }

    const db = window.firebase.firestore();
    db.collection('orgs').doc(currentOrg.id).collection('auditLog')
      .orderBy('timestamp', 'desc')
      .limit(50)
      .get()
      .then(snapshot => {
          if (snapshot.empty) {
              container.innerHTML = `<p class="text-secondary" style="text-align:center; padding: 20px;">No logs found.</p>`;
              return;
          }

          let html = '<div class="audit-timeline" style="position: relative; padding-left: 20px; border-left: 2px solid var(--border-color); margin-left: 10px;">';
          snapshot.forEach(doc => {
              const log = doc.data();
              const user = _orgMembersCache?.find(m => m.uid === log.by)?.displayName || log.by;
              const date = log.timestamp ? new Date(log.timestamp.toDate()).toLocaleString() : 'Just now';
              
              let icon = '📝';
              if (log.action.includes('ADDED')) icon = '➕';
              if (log.action.includes('DELETED') || log.action.includes('REJECTED')) icon = '❌';
              if (log.action.includes('APPROVED')) icon = '✅';

              html += `
                  <div class="audit-item" style="position: relative; margin-bottom: 15px;">
                      <div class="audit-icon" style="position: absolute; left: -30px; background: var(--bg-primary); padding: 2px; border-radius: 50%; font-size: 14px;">${icon}</div>
                      <div style="font-size: 14px; color: var(--text-primary);">
                          <strong>${user}</strong> performed <strong>${log.action}</strong>
                      </div>
                      <div style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;">
                          Target ID: ${log.targetId} • ${date}
                      </div>
                  </div>
              `;
          });
          html += '</div>';
          container.innerHTML = html;
      })
      .catch(err => {
          console.error("Failed to load audit logs", err);
          container.innerHTML = `<p class="text-danger" style="text-align:center;">Failed to load logs.</p>`;
      });
}

function openAuditModal() {
    document.getElementById('auditModal').classList.add('active');
    refreshAuditLog();
}

function closeAuditModal() {
    document.getElementById('auditModal').classList.remove('active');
}
