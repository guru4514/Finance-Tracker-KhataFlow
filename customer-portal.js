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

        // Use totalPaid stored on the customer document (updated whenever a payment is recorded)
        // This is secure because we only need a single 'get' on the customer doc, no payment list query needed
        renderCustomerPassbook(customer);

        // Switch UI
        document.getElementById('customerPortalLogin').style.display = 'none';
        document.getElementById('customerPortalPassbook').style.display = 'block';

    } catch (err) {
        console.error('Error tracking customer:', err);
        if (typeof showToast === 'function') showToast('Error fetching data. Check your Customer ID and Org ID.', 'error');
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
}

function renderCustomerPassbook(customer) {
    document.getElementById('passbookCustomerName').innerText = customer.name || 'Unknown';
    document.getElementById('passbookAgentName').innerText = 'Agent: ' + (customer.assignedAgentName || 'Unknown');
    
    const loanAmount = customer.loanAmount || 0;
    const totalPaid = customer.totalPaid || 0;
    const remaining = Math.max(0, loanAmount - totalPaid);

    document.getElementById('passbookTotalLoan').innerText = '₹' + loanAmount.toLocaleString();
    document.getElementById('passbookTotalPaid').innerText = '₹' + totalPaid.toLocaleString();
    document.getElementById('passbookRemaining').innerText = '₹' + remaining.toLocaleString();

    // Render payment history from recentPayments stored on the customer document
    const payments = customer.recentPayments || [];
    const tbody = document.getElementById('passbookPaymentsList');
    
    if (payments.length > 0) {
        tbody.innerHTML = payments.map(p => `
            <tr>
                <td>${p.date || 'Unknown'}</td>
                <td style="color: var(--success-color); font-weight: 500;">₹${(p.amount || 0).toLocaleString()}</td>
            </tr>
        `).join('');
    } else {
        tbody.innerHTML = `<tr><td colspan="2" style="text-align: center; color: var(--text-secondary); padding: 24px;">No payments recorded yet.</td></tr>`;
    }
}
