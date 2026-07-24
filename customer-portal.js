// ========================================
// CUSTOMER PORTAL & TRACKING
// ========================================

function showCustomerPortalLogin() {
    const onboardingUI = document.getElementById('onboardingUI');
    const portalUI = document.getElementById('customerPortalUI');
    const loginSection = document.getElementById('customerPortalLogin');
    const passbookSection = document.getElementById('customerPortalPassbook');
    const trackInput = document.getElementById('trackCustomerId');

    if (onboardingUI) onboardingUI.style.display = 'none';
    if (portalUI) portalUI.style.display = 'block';
    if (loginSection) loginSection.style.display = 'block';
    if (passbookSection) passbookSection.style.display = 'none';
    if (trackInput) trackInput.value = '';
}

function hideCustomerPortalLogin() {
    const onboardingUI = document.getElementById('onboardingUI');
    const portalUI = document.getElementById('customerPortalUI');

    if (portalUI) portalUI.style.display = 'none';
    if (onboardingUI) onboardingUI.style.display = 'block';
}

function resetCustomerPortal() {
    const loginSection = document.getElementById('customerPortalLogin');
    const passbookSection = document.getElementById('customerPortalPassbook');
    const trackInput = document.getElementById('trackCustomerId');

    if (passbookSection) passbookSection.style.display = 'none';
    if (loginSection) loginSection.style.display = 'block';
    if (trackInput) trackInput.value = '';
}

async function trackCustomerPassbook() {
    const orgIdInput = document.getElementById('trackOrgId').value.trim();
    const customerIdInput = document.getElementById('trackCustomerId').value.trim();
    
    if (!orgIdInput || !customerIdInput) {
        if (typeof showToast === 'function') showToast('Please enter both Organization ID and Customer ID', 'error');
        return;
    }

    if (typeof firebase === 'undefined' || !firebase.apps.length) {
        if (typeof showToast === 'function') showToast('Cloud database is not connected.', 'error');
        return;
    }

    const db = firebase.firestore();
    const btn = document.querySelector('#customerPortalLogin .btn-primary');
    const originalText = btn.innerText;
    btn.innerText = 'Searching...';
    btn.disabled = true;

    try {
        // Query specific org and customer directly
        const customerDoc = await db.collection('orgs').doc(orgIdInput).collection('customers').doc(customerIdInput).get();

        if (!customerDoc.exists) {
            if (typeof showToast === 'function') showToast('Record not found. Please check your Organization ID and Customer ID.', 'error');
            btn.innerText = originalText;
            btn.disabled = false;
            return;
        }

        const customer = customerDoc.data();

        // Now find all payments for this customer in this org
        const paymentsSnapshot = await db.collection('orgs').doc(orgIdInput).collection('payments')
            .where('customerId', '==', customerIdInput)
            .orderBy('date', 'desc')
            .get();

        const payments = paymentsSnapshot.docs.map(doc => doc.data());

        // Render data
        renderCustomerPassbook(customer, payments);

        // Switch UI
        document.getElementById('customerPortalLogin').style.display = 'none';
        document.getElementById('customerPortalPassbook').style.display = 'block';

    } catch (err) {
        console.error('Error tracking customer:', err);
        if (err.message && err.message.includes('permission')) {
            alert('Firebase Security Rules Error!\n\nPlease open your Firebase Console -> Firestore -> Rules and add:\n\nmatch /orgs/{orgId}/customers/{customerId} { allow get: if true; }\nmatch /orgs/{orgId}/payments/{paymentId} { allow list: if true; }\n\nTo allow customers to view their passbook.');
        } else {
            if (typeof showToast === 'function') showToast('Error fetching data. Check connection.', 'error');
        }
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
}

function renderCustomerPassbook(customer, payments) {
    document.getElementById('passbookCustomerName').innerText = customer.name || 'Unknown';
    document.getElementById('passbookAgentName').innerText = 'Agent: ' + (customer.assignedAgentName || 'Unknown');
    document.getElementById('passbookTotalLoan').innerText = '₹' + (customer.loanAmount || 0).toLocaleString();

    // Calculate payments total
    let totalPaid = 0;
    const paymentsListHtml = payments.map(p => {
        totalPaid += (p.amount || 0);
        return `
            <tr>
                <td>${p.date || 'Unknown'}</td>
                <td style="color: var(--success-color); font-weight: 500;">₹${(p.amount || 0).toLocaleString()}</td>
            </tr>
        `;
    }).join('');

    const remaining = Math.max(0, (customer.loanAmount || 0) - totalPaid);
    document.getElementById('passbookRemaining').innerText = '₹' + remaining.toLocaleString();

    const tbody = document.getElementById('passbookPaymentsList');
    if (payments.length > 0) {
        tbody.innerHTML = paymentsListHtml;
    } else {
        tbody.innerHTML = `<tr><td colspan="2" style="text-align: center; color: var(--text-secondary);">No payments found.</td></tr>`;
    }
}
