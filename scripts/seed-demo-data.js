/**
 * Pigmie Demo Data Seeder
 * =======================
 * Run this in browser console to populate the app with realistic demo data.
 * Usage: Open the app → F12 → Console → Paste this entire script → Press Enter
 * 
 * This creates:
 *  - 12 customers (8 loan + 4 saving) across 4 areas
 *  - 60+ payment entries spread across the last 30 days
 *  - Realistic Indian names, phone numbers, and amounts
 */

(function seedDemoData() {
    'use strict';

    // Don't run in Org mode — demo data is for Personal mode only
    if (typeof appMode !== 'undefined' && appMode === 'org') {
        alert('⚠️ Switch to Personal Mode first before seeding demo data.');
        return;
    }

    const existingCustomers = getCustomers();
    if (existingCustomers.length > 0) {
        if (!confirm(`You already have ${existingCustomers.length} customers. This will ADD demo data on top. Continue?`)) {
            return;
        }
    }

    // --- Helpers ---
    function id() { return Date.now().toString(36) + Math.random().toString(36).substring(2, 11); }
    function custId() { return 'CUST-' + Math.floor(100000 + Math.random() * 900000); }
    function daysAgo(n) {
        const d = new Date();
        d.setDate(d.getDate() - n);
        return d.toISOString().split('T')[0];
    }
    function daysFromNow(n) {
        const d = new Date();
        d.setDate(d.getDate() + n);
        return d.toISOString().split('T')[0];
    }

    // --- Demo Customers ---
    const demoCustomers = [
        // Loan customers
        { name: 'Ramesh Kumar',      phone: '9876543210', area: 'Koramangala',  customerType: 'loan',   loanAmount: 50000,  interestRate: 2, issuedDate: daysAgo(90),  deadline: daysFromNow(60) },
        { name: 'Suresh Patil',      phone: '9876543211', area: 'HSR Layout',   customerType: 'loan',   loanAmount: 25000,  interestRate: 3, issuedDate: daysAgo(60),  deadline: daysFromNow(90) },
        { name: 'Anita Rao',         phone: '9876543212', area: 'Jayanagar',    customerType: 'loan',   loanAmount: 10000,  interestRate: 2, issuedDate: daysAgo(45),  deadline: daysFromNow(45) },
        { name: 'Manoj Sharma',      phone: '9876543213', area: 'Rajajinagar',  customerType: 'loan',   loanAmount: 75000,  interestRate: 1.5, issuedDate: daysAgo(120), deadline: daysFromNow(30) },
        { name: 'Priya Devi',        phone: '9876543214', area: 'Koramangala',  customerType: 'loan',   loanAmount: 30000,  interestRate: 2, issuedDate: daysAgo(30),  deadline: daysFromNow(120) },
        { name: 'Venkatesh Gowda',   phone: '9876543215', area: 'HSR Layout',   customerType: 'loan',   loanAmount: 15000,  interestRate: 2.5, issuedDate: daysAgo(75),  deadline: daysFromNow(15) },
        { name: 'Lakshmi Naik',      phone: '9876543216', area: 'Jayanagar',    customerType: 'loan',   loanAmount: 40000,  interestRate: 2, issuedDate: daysAgo(50),  deadline: daysFromNow(100) },
        { name: 'Ravi Hegde',        phone: '9876543217', area: 'Rajajinagar',  customerType: 'loan',   loanAmount: 20000,  interestRate: 3, issuedDate: daysAgo(100), deadline: daysAgo(5) }, // overdue!

        // Saving customers
        { name: 'Deepa Shetty',      phone: '9876543218', area: 'Koramangala',  customerType: 'saving', loanAmount: 50000,  interestRate: 0, issuedDate: daysAgo(60),  deadline: daysFromNow(300) },
        { name: 'Kiran Desai',       phone: '9876543219', area: 'HSR Layout',   customerType: 'saving', loanAmount: 100000, interestRate: 0, issuedDate: daysAgo(90),  deadline: daysFromNow(270) },
        { name: 'Meera Joshi',       phone: '9876543220', area: 'Jayanagar',    customerType: 'saving', loanAmount: 25000,  interestRate: 0, issuedDate: daysAgo(45),  deadline: daysFromNow(315) },
        { name: 'Arun Bhat',         phone: '9876543221', area: 'Rajajinagar',  customerType: 'saving', loanAmount: 75000,  interestRate: 0, issuedDate: daysAgo(30),  deadline: daysFromNow(330) },
    ];

    const customers = [];
    const payments = [];

    demoCustomers.forEach(c => {
        const customerId = custId();
        customers.push({
            id: customerId,
            name: c.name,
            phone: c.phone,
            area: c.area,
            customerType: c.customerType,
            loanAmount: c.loanAmount,
            interestRate: c.interestRate,
            issuedDate: c.issuedDate,
            deadline: c.deadline,
            status: 'active',
            pin: '1234',
            timestamp: Date.now()
        });

        // Generate realistic payment history
        const dailyAmount = c.customerType === 'saving'
            ? [100, 200, 300, 500][Math.floor(Math.random() * 4)]
            : [200, 300, 500, 1000][Math.floor(Math.random() * 4)];

        // Pay on random days in the last 30 days (60-80% collection rate)
        for (let day = 29; day >= 0; day--) {
            const shouldPay = Math.random() < 0.7; // 70% chance of payment each day
            if (shouldPay) {
                // Occasional variation in amount (±20%)
                const variation = 1 + (Math.random() * 0.4 - 0.2);
                const amount = Math.round(dailyAmount * variation / 10) * 10; // round to nearest 10

                payments.push({
                    id: id(),
                    customerId: customerId,
                    date: daysAgo(day),
                    amount: Math.max(50, amount), // minimum ₹50
                    timestamp: Date.now() - (day * 86400000) + Math.floor(Math.random() * 43200000)
                });
            }
        }
    });

    // Save everything
    const existingPayments = getPayments();
    saveCustomers([...existingCustomers, ...customers]);
    savePayments([...existingPayments, ...payments]);

    // Refresh the view
    if (typeof refreshCurrentView === 'function') {
        refreshCurrentView();
    }

    const totalPayments = payments.length;
    const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);

    console.log(`✅ Demo data seeded successfully!`);
    console.log(`   📊 ${customers.length} customers added`);
    console.log(`   💰 ${totalPayments} payments (₹${totalAmount.toLocaleString()})`);
    console.log(`   🏘️ Areas: Koramangala, HSR Layout, Jayanagar, Rajajinagar`);

    if (typeof showToast === 'function') {
        showToast(`Demo loaded: ${customers.length} customers, ${totalPayments} payments!`, 'success');
    }

    alert(`✅ Demo data loaded!\n\n• ${customers.length} customers (8 loan + 4 saving)\n• ${totalPayments} payments across 30 days\n• Total: ₹${totalAmount.toLocaleString()}\n\nRefresh the page if charts don't update.`);
})();
