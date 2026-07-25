/* ========================================
   PIGMIE RECORD MANAGEMENT SYSTEM - APP
   ======================================== */

// === Data Store (localStorage) ===
const STORAGE_KEYS = {
    CUSTOMERS: 'pigmie_customers',
    PAYMENTS: 'pigmie_payments',
    LANGUAGE: 'pigmie_language',
    SETTINGS: 'pigmie_settings'
};

const AMOUNT_OPTIONS = [50, 100, 150, 200, 250, 300, 400, 450, 500, 550, 600, 650, 700, 1000, 1500, 2000, 2500, 3000];

// === Translation System ===
const SUPPORTED_LANGUAGES = ['en', 'kn', 'hi'];
const LANGUAGE_LOCALES = {
    en: 'en-IN',
    kn: 'kn-IN',
    hi: 'hi-IN'
};

let currentLang = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'en';
if (!SUPPORTED_LANGUAGES.includes(currentLang)) {
    currentLang = 'en';
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, currentLang);
}

const TRANSLATIONS = {
    en: {
        // App
        appName: 'Pigmie',
        appSubtitle: 'Record Manager',

        // Navigation
        navDashboard: 'Home',
        navCustomers: 'Customers',
        navDailyEntry: 'Daily Entry',
        navCollect: 'Collect',
        navRecords: 'Records',

        // Dashboard Stats
        statTotalCustomers: 'Total Customers',
        statTotalCollected: 'Total Collected',
        statPendingAmount: 'Pending Amount',
        statTodayCollection: "Today's Collection",

        // Dashboard Cards
        collectionEfficiency: "Today's Collection Efficiency",
        expected: 'Expected',
        actual: 'Actual',
        attentionNeeded: 'Attention Needed',
        noMissedPayments: 'All customers are up to date',
        recentPayments: 'Recent Payments',
        upcomingDeadlines: 'Upcoming Deadlines',
        noPaymentsYet: 'No payments recorded yet',
        noDeadlines: 'No upcoming deadlines',

        // Customer
        noCustomersYet: 'No customers added yet',
        clickAddCustomer: 'Click "Add Customer" to get started',
        noCustomersFound: 'No customers found',
        tryDifferentSearch: 'Try a different search term',
        searchCustomersPlaceholder: 'Search customers by name or phone...',
        searchCustomerPlaceholder: 'Search customer...',

        // Customer Card Labels
        customerType: 'Customer Type',
        loanCustomer: 'Loan Customer',
        savingCustomer: 'Saving Customer',
        loanAmount: 'Loan Amount',
        savingAmount: 'Saving Amount',
        issuedDate: 'Issued Date',
        deadline: 'Deadline',
        collected: 'Collected',
        pending: 'Pending',
        collectionProgress: 'Collection Progress',

        // Daily Entry
        entryDate: 'Entry Date',
        noCustomersToShow: 'No customers to show',
        addCustomersFirst: 'Add customers first to start daily entries',
        orEnterManually: 'Or enter amount manually',
        save: 'Save',
        paid: 'Paid',
        pendingStatus: 'Pending',
        loan: 'Loan',

        // Records
        noRecords: 'No records to display',
        recordsWillAppear: 'Records will appear once payments are entered',
        noPaymentsRecorded: 'No payments recorded',
        progress: 'Progress',
        date: 'Date',
        amount: 'Amount',
        runningTotal: 'Running Total',

        // Modal
        addNewCustomer: 'Add New Customer',
        editCustomer: 'Edit Customer',
        customerRecord: 'Customer Record',
        labelCustomerName: 'Customer Name <span class="required">*</span>',
        labelPhone: 'Phone Number <span class="required">*</span>',
        labelCustomerType: 'Customer Type <span class="required">*</span>',
        labelLoanAmount: 'Loan Amount (₹) <span class="required">*</span>',
        labelSavingAmount: 'Saving Amount (₹) <span class="required">*</span>',
        labelIssuedDate: 'Issued Date <span class="required">*</span>',
        labelDeadline: 'Deadline <span class="required">*</span>',
        phCustomerName: 'Enter full name',
        phPhone: 'Enter phone number',
        phLoanAmount: 'Enter loan amount',
        phSavingAmount: 'Enter saving amount',
        btnCancel: 'Cancel',
        btnSaveCustomer: 'Save Customer',
        btnUpdateCustomer: 'Update Customer',
        addCustomer: 'Add Customer',

        // Detail Modal
        totalPaid: 'Total Paid',
        overallProgress: 'Overall Progress',
        paymentHistory: 'Payment History',
        entries: 'entries',
        noPaymentsRecordedYet: 'No payments recorded yet',

        // Toasts
        customerAdded: 'Customer added successfully!',
        customerUpdated: 'Customer updated successfully!',
        customerDeleted: 'Customer deleted successfully!',
        paymentDeleted: 'Payment deleted!',
        selectDateFirst: 'Please select a date first!',
        selectOrEnterAmount: 'Please select or enter an amount!',
        amountRecorded: 'recorded for',
        customer: 'customer',

        // Confirm
        confirmDeleteCustomer: 'Are you sure you want to delete this customer? All payment records will also be deleted.',
        confirmDeletePayment: 'Delete this payment entry?',
        confirmCancel: 'Cancel',
        confirmDelete: 'Delete',

        // Deadline badges
        dOverdue: 'd overdue',
        dLeft: 'd left',

        // Lang toggle
        langSwitch: 'ಕನ್ನಡ',

        // Navigation
        navSettings: 'Settings',

        // Settings Page
        settingsBusinessProfile: 'Business Profile',
        settingsBusinessName: 'Business Name',
        settingsBusinessNameDesc: 'Name displayed in sidebar and exports',
        settingsBusinessNamePh: 'Enter business name',
        settingsOwnerName: 'Owner Name',
        settingsOwnerNameDesc: 'Your name for records',
        settingsOwnerNamePh: 'Enter owner name',
        settingsSaved: 'Settings saved!',

        settingsAppLock: 'App Lock',
        settingsEnableBiometric: 'Fingerprint / Biometric',
        settingsEnableBiometricDesc: 'Use device fingerprint to unlock the app',
        settingsEnablePin: 'PIN Lock',
        settingsEnablePinDesc: 'Require a 4-digit PIN to open the app',
        settingsChangePin: 'Change PIN',
        settingsChangePinDesc: 'Update your current PIN',
        setPinTitle: 'Set PIN',
        changePinTitle: 'Change PIN',
        enterNewPin: 'Enter new 4-digit PIN',
        confirmNewPin: 'Confirm your PIN',
        enterCurrentPin: 'Enter current PIN',
        enterPinToUnlock: 'Enter PIN to unlock',
        pinSet: 'PIN has been set!',
        pinChanged: 'PIN changed successfully!',
        pinRemoved: 'PIN lock disabled!',
        pinMismatch: 'PINs do not match. Try again.',
        wrongPin: 'Wrong PIN. Try again.',
        wrongCurrentPin: 'Current PIN is incorrect.',

        settingsDefaults: 'Defaults',
        settingsDefaultAmount: 'Default Amount',
        settingsDefaultAmountDesc: 'Default daily collection amount',

        settingsBackupRestore: 'Backup & Restore',
        settingsExportBackup: 'Export Backup',
        settingsExportBackupDesc: 'Download all data as a JSON file',
        settingsImportBackup: 'Import Backup',
        settingsImportBackupDesc: 'Restore data from a backup file',
        backupExported: 'Backup exported successfully!',
        syncingBeforeLogout: 'Syncing before logout...',
        fetchingAccountData: 'Fetching account data...',
        backupImported: 'Backup imported successfully! Data restored.',
        backupInvalid: 'Invalid backup file. Please select a valid JSON backup.',
        confirmImportBackup: 'This will replace ALL existing data with the backup. Are you sure?',
        confirmImportBtn: 'Import',

        settingsDangerZone: 'Danger Zone',
        settingsClearAll: 'Clear All Data',
        settingsClearAllDesc: 'Permanently delete all customers, payments, and settings',
        confirmClearAll: 'Are you absolutely sure? This will permanently delete ALL customers, payments, and settings. This cannot be undone!',
        confirmClearBtn: 'Delete Everything',
        dataCleared: 'All data has been cleared!',

        settingsAboutVersion: 'Pigmie Record Manager v1.0.0',
        settingsAboutCredit: 'Built By Guru',

        // Phase 2 - Interest
        labelInterestRate: 'Interest Rate (% monthly)',
        phInterestRate: 'e.g. 2',
        interestRate: 'Interest Rate',
        totalRepayable: 'Total Repayable',
        interestEarned: 'Interest',
        principalAmount: 'Principal',
        monthlyInterest: '/month',

        // Phase 2 - Loan Status
        filterAll: 'All',
        filterActive: 'Active',
        filterClosed: 'Closed',
        statusActive: 'Active',
        statusClosed: 'Closed',
        closeLoan: 'Close Loan',
        renewLoan: 'Renew Loan',
        loanClosed: 'Loan closed successfully!',
        loanRenewed: 'Loan renewed! New cycle started.',
        confirmCloseLoan: 'Mark this loan as closed? The customer will be moved to the closed list.',
        confirmClose: 'Close',

        // Phase 2 - Edit Payment
        editPayment: 'Edit Payment',
        editPaymentTitle: 'Edit Payment',
        editAmount: 'Amount (₹)',
        editDate: 'Date',
        paymentUpdated: 'Payment updated!',
        btnSave: 'Save',
        btnUpdate: 'Update',

        // Phase 3 - Reports
        navReports: 'Reports',
        reportsThisMonth: 'This Month',
        reportsActiveLoans: 'Active Loans',
        reportsDefaulters: 'Defaulters',
        reportsCollectionTrend: 'Collection Trend (Last 30 Days)',
        reportsDefaultersList: 'Defaulters List (>3 Days Overdue)',
        reportsDataExport: 'Data Export (Excel/CSV)',
        exportCustomers: 'Export Customers',
        exportPayments: 'Export Payments',
        exportToday: "Today's Report",
        exportWeek: "This Week's Report",
        exportMonth: "This Month's Report",
        exportCustom: 'Custom Range',
        dateFrom: 'From Date',
        dateTo: 'To Date',
        exportReport: 'Export Report',
        generatePeriodicReports: 'Generate Periodic Reports',
        selectAtLeastOne: 'Please select at least one report type!',
        exportSuccessful: 'Export successful!',
        reportTitleToday: "Today's Collection Report",
        reportTitleWeek: "Weekly Collection Report",
        reportTitleMonth: "Monthly Collection Report",
        reportTitleCustom: "Custom Collection Report",
        noDefaulters: 'No Defaulters 🎉',
        allCustomersPaying: 'All active customers are paying on time!',
        daysOverdue: 'days',
        overdueLabel: 'overdue',

        // Phase 4 - Areas, Bulk Entry, Reminders
        lblCustomerArea: 'Area / Route',
        allAreas: 'All Areas',
        btnBatchCollect: 'Batch Collect',
        bulkCollectTitle: 'Batch Collect',
        lblBulkAmount: 'Amount per customer (₹)',
        btnConfirmBulk: 'Confirm Collection',
        selectedCustomers: 'selected',
        btnSendReminder: 'Send Reminder',
        reminderMessage: 'Hello {name}, this is a gentle reminder that your Pigmie payment of {amount} is pending. Please arrange the payment at your earliest convenience. Thank you!',

        // Phase 6 - Sort
        sortNameAsc: 'Name (A-Z)',
        sortNameDesc: 'Name (Z-A)',
        sortAmountDesc: 'Amount (High-Low)',
        sortDeadlineAsc: 'Deadline (Closest)',
        sortNewest: 'Recently Added',

        // Phase 7 - Undo
        undo: 'Undo',
        confirmUndo: 'Are you sure you want to undo this action?',
        actionUndone: 'Action successfully undone.',
        appearance: 'Appearance',
        themeMode: 'Theme Mode',
        themeModeDesc: 'Switch between Light and Dark mode.',

        // Phase 8 - Export Reports
        reportSlNo: 'Sl. No.',
        reportDate: 'Date',
        reportCustomerName: 'Customer Name',
        reportPhone: 'Phone Number',
        reportAmount: 'Amount Collected',
        reportTotalCollection: 'Total Collection',
        reportTotalCustomers: 'Total Customers',
        reportGeneratedBy: 'Generated by',
        reportUnknown: 'Unknown',

        // Phase 9 - UX
        pressBackAgain: 'Press back again to exit',
        loginNotification: 'Login Notification',
        loginNotificationBody: 'You have logged in to Pigmie Record Manager'
    },
    kn: {
        // App
        appName: 'ಪಿಗ್ಮಿ',
        appSubtitle: 'ದಾಖಲೆ ನಿರ್ವಾಹಕ',

        // Navigation
        navDashboard: 'ಮುಖಪುಟ',
        navCustomers: 'ಗ್ರಾಹಕರು',
        navDailyEntry: 'ದೈನಂದಿನ ನಮೂದು',
        navCollect: 'ಸಂಗ್ರಹಿಸಿ',
        navRecords: 'ದಾಖಲೆಗಳು',

        // Dashboard Stats
        statTotalCustomers: 'ಒಟ್ಟು ಗ್ರಾಹಕರು',
        statTotalCollected: 'ಒಟ್ಟು ಸಂಗ್ರಹ',
        statPendingAmount: 'ಬಾಕಿ ಮೊತ್ತ',
        statTodayCollection: 'ಇಂದಿನ ಸಂಗ್ರಹ',

        // Dashboard Cards
        collectionEfficiency: 'ಇಂದಿನ ಸಂಗ್ರಹಣೆ ದಕ್ಷತೆ',
        expected: 'ನಿರೀಕ್ಷಿತ',
        actual: 'ವಾಸ್ತವಿಕ',
        attentionNeeded: 'ಗಮನ ಹರಿಸಬೇಕಿದೆ',
        noMissedPayments: 'ಎಲ್ಲಾ ಗ್ರಾಹಕರು ಸದ್ಯದವರೆಗಿದ್ದಾರೆ',
        recentPayments: 'ಇತ್ತೀಚಿನ ಪಾವತಿಗಳು',
        upcomingDeadlines: 'ಮುಂಬರುವ ಗಡುವು',
        noPaymentsYet: 'ಇನ್ನೂ ಯಾವುದೇ ಪಾವತಿ ದಾಖಲಾಗಿಲ್ಲ',
        noDeadlines: 'ಮುಂಬರುವ ಗಡುವುಗಳಿಲ್ಲ',

        // Customer
        noCustomersYet: 'ಇನ್ನೂ ಯಾವುದೇ ಗ್ರಾಹಕರನ್ನು ಸೇರಿಸಲಾಗಿಲ್ಲ',
        clickAddCustomer: '"ಗ್ರಾಹಕರನ್ನು ಸೇರಿಸಿ" ಕ್ಲಿಕ್ ಮಾಡಿ ಪ್ರಾರಂಭಿಸಿ',
        noCustomersFound: 'ಯಾವುದೇ ಗ್ರಾಹಕರು ಕಂಡುಬಂದಿಲ್ಲ',
        tryDifferentSearch: 'ಬೇರೆ ಹುಡುಕಾಟ ಪದವನ್ನು ಪ್ರಯತ್ನಿಸಿ',
        searchCustomersPlaceholder: 'ಹೆಸರು ಅಥವಾ ಫೋನ್ ಮೂಲಕ ಹುಡುಕಿ...',
        searchCustomerPlaceholder: 'ಗ್ರಾಹಕರನ್ನು ಹುಡುಕಿ...',

        // Customer Card Labels
        customerType: 'ಗ್ರಾಹಕ ಪ್ರಕಾರ',
        loanCustomer: 'ಸಾಲ ಗ್ರಾಹಕ',
        savingCustomer: 'ಉಳಿತಾಯ ಗ್ರಾಹಕ',
        loanAmount: 'ಸಾಲದ ಮೊತ್ತ',
        savingAmount: 'ಉಳಿತಾಯ ಮೊತ್ತ',
        issuedDate: 'ನೀಡಿದ ದಿನಾಂಕ',
        deadline: 'ಗಡುವು',
        collected: 'ಸಂಗ್ರಹಿಸಲಾಗಿದೆ',
        pending: 'ಬಾಕಿ',
        collectionProgress: 'ಸಂಗ್ರಹ ಪ್ರಗತಿ',

        // Daily Entry
        entryDate: 'ನಮೂದು ದಿನಾಂಕ',
        noCustomersToShow: 'ತೋರಿಸಲು ಗ್ರಾಹಕರಿಲ್ಲ',
        addCustomersFirst: 'ದೈನಂದಿನ ನಮೂದನ್ನು ಪ್ರಾರಂಭಿಸಲು ಮೊದಲು ಗ್ರಾಹಕರನ್ನು ಸೇರಿಸಿ',
        orEnterManually: 'ಅಥವಾ ಮೊತ್ತವನ್ನು ಕೈಯಿಂದ ನಮೂದಿಸಿ',
        save: 'ಉಳಿಸಿ',
        paid: 'ಪಾವತಿಸಲಾಗಿದೆ',
        pendingStatus: 'ಬಾಕಿ',
        loan: 'ಸಾಲ',

        // Records
        noRecords: 'ತೋರಿಸಲು ದಾಖಲೆಗಳಿಲ್ಲ',
        recordsWillAppear: 'ಪಾವತಿಗಳನ್ನು ನಮೂದಿಸಿದ ನಂತರ ದಾಖಲೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ',
        noPaymentsRecorded: 'ಯಾವುದೇ ಪಾವತಿ ದಾಖಲಾಗಿಲ್ಲ',
        progress: 'ಪ್ರಗತಿ',
        date: 'ದಿನಾಂಕ',
        amount: 'ಮೊತ್ತ',
        runningTotal: 'ಚಾಲ್ತಿ ಒಟ್ಟು',

        // Modal
        addNewCustomer: 'ಹೊಸ ಗ್ರಾಹಕರನ್ನು ಸೇರಿಸಿ',
        editCustomer: 'ಗ್ರಾಹಕರ ವಿವರ ಬದಲಾಯಿಸಿ',
        customerRecord: 'ಗ್ರಾಹಕರ ದಾಖಲೆ',
        labelCustomerName: 'ಗ್ರಾಹಕರ ಹೆಸರು <span class="required">*</span>',
        labelPhone: 'ಫೋನ್ ಸಂಖ್ಯೆ <span class="required">*</span>',
        labelCustomerType: 'ಗ್ರಾಹಕ ಪ್ರಕಾರ <span class="required">*</span>',
        labelLoanAmount: 'ಸಾಲದ ಮೊತ್ತ (₹) <span class="required">*</span>',
        labelSavingAmount: 'ಉಳಿತಾಯ ಮೊತ್ತ (₹) <span class="required">*</span>',
        labelIssuedDate: 'ನೀಡಿದ ದಿನಾಂಕ <span class="required">*</span>',
        labelDeadline: 'ಗಡುವು <span class="required">*</span>',
        phCustomerName: 'ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ',
        phPhone: 'ಫೋನ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ',
        phLoanAmount: 'ಸಾಲದ ಮೊತ್ತ ನಮೂದಿಸಿ',
        phSavingAmount: 'ಉಳಿತಾಯ ಮೊತ್ತ ನಮೂದಿಸಿ',
        btnCancel: 'ರದ್ದುಮಾಡಿ',
        btnSaveCustomer: 'ಗ್ರಾಹಕರನ್ನು ಉಳಿಸಿ',
        btnUpdateCustomer: 'ಗ್ರಾಹಕರನ್ನು ನವೀಕರಿಸಿ',
        addCustomer: 'ಗ್ರಾಹಕರನ್ನು ಸೇರಿಸಿ',

        // Detail Modal
        totalPaid: 'ಒಟ್ಟು ಪಾವತಿ',
        overallProgress: 'ಒಟ್ಟಾರೆ ಪ್ರಗತಿ',
        paymentHistory: 'ಪಾವತಿ ಇತಿಹಾಸ',
        entries: 'ನಮೂದುಗಳು',
        noPaymentsRecordedYet: 'ಇನ್ನೂ ಯಾವುದೇ ಪಾವತಿ ದಾಖಲಾಗಿಲ್ಲ',

        // Toasts
        customerAdded: 'ಗ್ರಾಹಕರನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸೇರಿಸಲಾಗಿದೆ!',
        customerUpdated: 'ಗ್ರಾಹಕರ ವಿವರ ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ!',
        customerDeleted: 'ಗ್ರಾಹಕರನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಅಳಿಸಲಾಗಿದೆ!',
        paymentDeleted: 'ಪಾವತಿ ಅಳಿಸಲಾಗಿದೆ!',
        selectDateFirst: 'ದಯವಿಟ್ಟು ಮೊದಲು ದಿನಾಂಕವನ್ನು ಆಯ್ಕೆಮಾಡಿ!',
        selectOrEnterAmount: 'ದಯವಿಟ್ಟು ಮೊತ್ತವನ್ನು ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ ನಮೂದಿಸಿ!',
        amountRecorded: 'ದಾಖಲಿಸಲಾಗಿದೆ -',
        customer: 'ಗ್ರಾಹಕ',

        // Confirm
        confirmDeleteCustomer: 'ನೀವು ಈ ಗ್ರಾಹಕರನ್ನು ಅಳಿಸಲು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ? ಎಲ್ಲಾ ಪಾವತಿ ದಾಖಲೆಗಳನ್ನೂ ಅಳಿಸಲಾಗುವುದು.',
        confirmDeletePayment: 'ಈ ಪಾವತಿ ನಮೂದನ್ನು ಅಳಿಸುವುದೇ?',
        confirmCancel: 'ರದ್ದುಮಾಡಿ',
        confirmDelete: 'ಅಳಿಸಿ',

        // Deadline badges
        dOverdue: 'ದಿ ಮೀರಿದೆ',
        dLeft: 'ದಿ ಬಾಕಿ',

        // Lang toggle
        langSwitch: 'हिन्दी',

        // Navigation
        navSettings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',

        // Settings Page
        settingsBusinessProfile: 'ವ್ಯಾಪಾರ ಪ್ರೊಫೈಲ್',
        settingsBusinessName: 'ವ್ಯಾಪಾರದ ಹೆಸರು',
        settingsBusinessNameDesc: 'ಸೈಡ್‌ಬಾರ್ ಮತ್ತು ರಫ್ತುಗಳಲ್ಲಿ ತೋರಿಸುವ ಹೆಸರು',
        settingsBusinessNamePh: 'ವ್ಯಾಪಾರದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ',
        settingsOwnerName: 'ಮಾಲೀಕರ ಹೆಸರು',
        settingsOwnerNameDesc: 'ದಾಖಲೆಗಳಿಗಾಗಿ ನಿಮ್ಮ ಹೆಸರು',
        settingsOwnerNamePh: 'ಮಾಲೀಕರ ಹೆಸರನ್ನು ನಮೂದಿಸಿ',
        settingsSaved: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಉಳಿಸಲಾಗಿದೆ!',

        settingsAppLock: 'ಆ್ಯಪ್ ಲಾಕ್ (App Lock)',
        settingsEnableBiometric: 'ಫಿಂಗರ್‌ಪ್ರಿಂಟ್ (Fingerprint)',
        settingsEnableBiometricDesc: 'ಆ್ಯಪ್ ತೆರೆಯಲು ಫಿಂಗರ್‌ಪ್ರಿಂಟ್ ಬಳಸಿ',
        settingsEnablePin: 'PIN ಲಾಕ್',
        settingsEnablePinDesc: 'ಆ್ಯಪ್ ತೆರೆಯಲು 4-ಅಂಕಿಯ PIN ಅಗತ್ಯವಿದೆ',
        settingsChangePin: 'PIN ಬದಲಾಯಿಸಿ',
        settingsChangePinDesc: 'ನಿಮ್ಮ ಪ್ರಸ್ತುತ PIN ಅನ್ನು ನವೀಕರಿಸಿ',
        setPinTitle: 'PIN ಹೊಂದಿಸಿ',
        changePinTitle: 'PIN ಬದಲಾಯಿಸಿ',
        enterNewPin: 'ಹೊಸ 4-ಅಂಕಿಯ PIN ನಮೂದಿಸಿ',
        confirmNewPin: 'ನಿಮ್ಮ PIN ಖಚಿತಪಡಿಸಿ',
        enterCurrentPin: 'ಪ್ರಸ್ತುತ PIN ನಮೂದಿಸಿ',
        enterPinToUnlock: 'ಅನ್‌ಲಾಕ್ ಮಾಡಲು PIN ನಮೂದಿಸಿ',
        pinSet: 'PIN ಹೊಂದಿಸಲಾಗಿದೆ!',
        pinChanged: 'PIN ಯಶಸ್ವಿಯಾಗಿ ಬದಲಾಯಿಸಲಾಗಿದೆ!',
        pinRemoved: 'PIN ಲಾಕ್ ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ!',
        pinMismatch: 'PIN ಹೊಂದಿಕೆಯಾಗಲಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
        wrongPin: 'ತಪ್ಪು PIN. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
        wrongCurrentPin: 'ಪ್ರಸ್ತುತ PIN ತಪ್ಪಾಗಿದೆ.',

        settingsDefaults: 'ಡೀಫಾಲ್ಟ್‌ಗಳು',
        settingsDefaultAmount: 'ಡೀಫಾಲ್ಟ್ ಮೊತ್ತ',
        settingsDefaultAmountDesc: 'ಡೀಫಾಲ್ಟ್ ದೈನಂದಿನ ಸಂಗ್ರಹ ಮೊತ್ತ',

        settingsBackupRestore: 'ಬ್ಯಾಕಪ್ ಮತ್ತು ಮರುಸ್ಥಾಪನೆ',
        settingsExportBackup: 'ಬ್ಯಾಕಪ್ ರಫ್ತು ಮಾಡಿ',
        settingsExportBackupDesc: 'ಎಲ್ಲಾ ಡೇಟಾವನ್ನು JSON ಫೈಲ್ ಆಗಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
        settingsImportBackup: 'ಬ್ಯಾಕಪ್ ಆಮದು ಮಾಡಿ',
        settingsImportBackupDesc: 'ಬ್ಯಾಕಪ್ ಫೈಲ್‌ನಿಂದ ಡೇಟಾ ಮರುಸ್ಥಾಪಿಸಿ',
        backupExported: 'ಬ್ಯಾಕಪ್ ಯಶಸ್ವಿಯಾಗಿ ರಫ್ತಾಗಿದೆ!',
        syncingBeforeLogout: 'ಲೊಗೌಟ್ ಮಾಡುವ ಮುನ್ನ ಸಿಂಕ್ ಮಾಡಲಾಗುತ್ತಿದೆ...',
        fetchingAccountData: 'ಖಾತೆ ಡೇಟಾ ಪಡೆಯಲಾಗುತ್ತಿದೆ...',
        backupImported: 'ಬ್ಯಾಕಪ್ ಯಶಸ್ವಿಯಾಗಿ ಆಮದಾಗಿದೆ! ಡೇಟಾ ಮರುಸ್ಥಾಪಿಸಲಾಗಿದೆ.',
        backupInvalid: 'ಅಮಾನ್ಯ ಬ್ಯಾಕಪ್ ಫೈಲ್. ಮಾನ್ಯ JSON ಬ್ಯಾಕಪ್ ಆಯ್ಕೆಮಾಡಿ.',
        confirmImportBackup: 'ಇದು ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಎಲ್ಲಾ ಡೇಟಾವನ್ನು ಬ್ಯಾಕಪ್‌ನೊಂದಿಗೆ ಬದಲಾಯಿಸುತ್ತದೆ. ನೀವು ಖಚಿತವಾಗಿದ್ದೀರಾ?',
        confirmImportBtn: 'ಆಮದು ಮಾಡಿ',

        settingsDangerZone: 'ಅಪಾಯ ವಲಯ',
        settingsClearAll: 'ಎಲ್ಲಾ ಡೇಟಾ ತೆರವುಗೊಳಿಸಿ',
        settingsClearAllDesc: 'ಎಲ್ಲಾ ಗ್ರಾಹಕರು, ಪಾವತಿಗಳು ಮತ್ತು ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಶಾಶ್ವತವಾಗಿ ಅಳಿಸಿ',
        confirmClearAll: 'ನೀವು ಖಚಿತವಾಗಿ ಖಚಿತವಾಗಿದ್ದೀರಾ? ಇದು ಎಲ್ಲಾ ಗ್ರಾಹಕರು, ಪಾವತಿಗಳು ಮತ್ತು ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಶಾಶ್ವತವಾಗಿ ಅಳಿಸುತ್ತದೆ. ಇದನ್ನು ರದ್ದುಗೊಳಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ!',
        confirmClearBtn: 'ಎಲ್ಲವನ್ನೂ ಅಳಿಸಿ',
        dataCleared: 'ಎಲ್ಲಾ ಡೇಟಾ ತೆರವುಗೊಳಿಸಲಾಗಿದೆ!',

        settingsAboutVersion: 'ಪಿಗ್ಮಿ ದಾಖಲೆ ನಿರ್ವಾಹಕ v1.0.0',
        settingsAboutCredit: 'Guru ನಿಂದ ನಿರ್ಮಿಸಲಾಗಿದೆ',

        // Phase 2 - Interest
        labelInterestRate: 'ಬಡ್ಡಿ ದರ (% ಮಾಸಿಕ)',
        phInterestRate: 'ಉದಾ: 2',
        interestRate: 'ಬಡ್ಡಿ ದರ',
        totalRepayable: 'ಒಟ್ಟು ಮರುಪಾವತಿ',
        interestEarned: 'ಬಡ್ಡಿ',
        principalAmount: 'ಅಸಲು ಮೊತ್ತ',
        monthlyInterest: '/ತಿಂಗಳು',

        // Phase 2 - Loan Status
        filterAll: 'ಎಲ್ಲಾ',
        filterActive: 'ಸಕ್ರಿಯ',
        filterClosed: 'ಮುಕ್ತಾಯ',
        statusActive: 'ಸಕ್ರಿಯ',
        statusClosed: 'ಮುಕ್ತಾಯ',
        closeLoan: 'ಸಾಲ ಮುಕ್ತಾಯಗೊಳಿಸಿ',
        renewLoan: 'ಸಾಲ ನವೀಕರಿಸಿ',
        loanClosed: 'ಸಾಲ ಯಶಸ್ವಿಯಾಗಿ ಮುಕ್ತಾಯಗೊಳಿಸಲಾಗಿದೆ!',
        loanRenewed: 'ಸಾಲ ನವೀಕರಿಸಲಾಗಿದೆ! ಹೊಸ ಚಕ್ರ ಪ್ರಾರಂಭವಾಗಿದೆ.',
        confirmCloseLoan: 'ಈ ಸಾಲವನ್ನು ಮುಕ್ತಾಯಗೊಳಿಸುವುದೇ? ಗ್ರಾಹಕರನ್ನು ಮುಕ್ತಾಯ ಪಟ್ಟಿಗೆ ಸರಿಸಲಾಗುವುದು.',
        confirmClose: 'ಮುಕ್ತಾಯಗೊಳಿಸಿ',

        // Phase 2 - Edit Payment
        editPayment: 'ಪಾವತಿ ಬದಲಾಯಿಸಿ',
        editPaymentTitle: 'ಪಾವತಿ ಬದಲಾಯಿಸಿ',
        editAmount: 'ಮೊತ್ತ (₹)',
        editDate: 'ದಿನಾಂಕ',
        paymentUpdated: 'ಪಾವತಿ ನವೀಕರಿಸಲಾಗಿದೆ!',
        btnSave: 'ಉಳಿಸಿ',
        btnUpdate: 'ನವೀಕರಿಸಿ',

        // Phase 3 - Reports
        navReports: 'ವರದಿಗಳು',
        reportsThisMonth: 'ಈ ತಿಂಗಳು',
        reportsActiveLoans: 'ಸಕ್ರಿಯ ಸಾಲಗಳು',
        reportsDefaulters: 'ಸುಸ್ತಿದಾರರು',
        reportsCollectionTrend: 'ಸಂಗ್ರಹಣೆ ಪ್ರವೃತ್ತಿ (ಕಳೆದ 30 ದಿನಗಳು)',
        reportsDefaultersList: 'ಸುಸ್ತಿದಾರರ ಪಟ್ಟಿ (>3 ದಿನಗಳು ಬಾಕಿ)',
        reportsDataExport: 'ಡೇಟಾ ರಫ್ತು (ಎಕ್ಸೆಲ್/CSV)',
        exportCustomers: 'ಗ್ರಾಹಕರನ್ನು ರಫ್ತು ಮಾಡಿ',
        exportPayments: 'ಪಾವತಿಗಳನ್ನು ರಫ್ತು ಮಾಡಿ',
        exportToday: "ಇಂದಿನ ವರದಿ",
        exportWeek: "ಈ ವಾರದ ವರದಿ",
        exportMonth: "ಈ ತಿಂಗಳ ವರದಿ",
        exportCustom: 'ಕಸ್ಟಮ್ ದಿನಾಂಕ',
        dateFrom: 'ಇಂದ (ದಿನಾಂಕ)',
        dateTo: 'ವರೆಗೆ (ದಿನಾಂಕ)',
        exportReport: 'ವರದಿ ರಫ್ತು ಮಾಡಿ',
        generatePeriodicReports: 'ನಿಯತಕಾಲಿಕ ವರದಿಗಳನ್ನು ರಚಿಸಿ',
        selectAtLeastOne: 'ಕನಿಷ್ಠ ಒಂದು ವರದಿ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ!',
        exportSuccessful: 'ರಫ್ತು ಯಶಸ್ವಿಯಾಗಿದೆ!',
        reportTitleToday: "ಇಂದಿನ ಸಂಗ್ರಹ ವರದಿ",
        reportTitleWeek: "ವಾರದ ಸಂಗ್ರಹ ವರದಿ",
        reportTitleMonth: "ಮಾಸಿಕ ಸಂಗ್ರಹ ವರದಿ",
        reportTitleCustom: "ಕಸ್ಟಮ್ ಸಂಗ್ರಹ ವರದಿ",
        noDefaulters: 'ಯಾವ ಸುಸ್ತಿದಾರರು ಇಲ್ಲ 🎉',
        allCustomersPaying: 'ಎಲ್ಲಾ ಸಕ್ರಿಯ ಗ್ರಾಹಕರು ಸಮಯಕ್ಕೆ ಪಾವತಿಸುತ್ತಿದ್ದಾರೆ!',
        daysOverdue: 'ದಿನಗಳು',
        overdueLabel: 'ಬಾಕಿ',

        // Phase 4 - Areas, Bulk Entry, Reminders
        lblCustomerArea: 'ಪ್ರದೇಶ / ಮಾರ್ಗ',
        allAreas: 'ಎಲ್ಲಾ ಪ್ರದೇಶಗಳು',
        btnBatchCollect: 'ಒಟ್ಟಿಗೆ ಸಂಗ್ರಹಿಸಿ',
        bulkCollectTitle: 'ಒಟ್ಟಿಗೆ ಸಂಗ್ರಹಿಸಿ',
        lblBulkAmount: 'ಗ್ರಾಹಕರಿಗೆ ಮೊತ್ತ (₹)',
        btnConfirmBulk: 'ಸಂಗ್ರಹಣೆಯನ್ನು ದೃಢೀಕರಿಸಿ',
        selectedCustomers: 'ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ',
        btnSendReminder: 'ಜ್ಞಾಪನೆ ಕಳುಹಿಸಿ',
        reminderMessage: 'ನಮಸ್ಕಾರ {name}, ನಿಮ್ಮ ಪಿಗ್ಮಿ ಪಾವತಿ {amount} ಬಾಕಿಯಿದೆ ಎಂದು ನೆನಪಿಸುತ್ತಿದ್ದೇವೆ. ದಯವಿಟ್ಟು ಪಾವತಿಸಿ. ಧನ್ಯವಾದಗಳು!',

        // Phase 6 - Sort
        sortNameAsc: 'ಹೆಸರು (A-Z)',
        sortNameDesc: 'ಹೆಸರು (Z-A)',
        sortAmountDesc: 'ಮೊತ್ತ (ಹೆಚ್ಚು-ಕಡಿಮೆ)',
        sortDeadlineAsc: 'ಗಡುವು (ಹತ್ತಿರದ)',
        sortNewest: 'ಇತ್ತೀಚೆಗೆ ಸೇರಿಸಲಾಗಿದೆ',

        // Phase 7 - Undo
        undo: 'ರದ್ದುಮಾಡು',
        confirmUndo: 'ಈ ಕ್ರಿಯೆಯನ್ನು ರದ್ದುಗೊಳಿಸಲು ನೀವು ಖಚಿತವಾಗಿದ್ದೀರಾ?',
        actionUndone: 'ಕ್ರಿಯೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ರದ್ದುಗೊಳಿಸಲಾಗಿದೆ.',
        appearance: 'ಗೋಚರತೆ',
        themeMode: 'ಥೀಮ್ ಮೋಡ್',
        themeModeDesc: 'ಲೈಟ್ ಮತ್ತು ಡಾರ್ಕ್ ಮೋಡ್ ನಡುವೆ ಬದಲಾಯಿಸಿ.',

        // Phase 8 - Export Reports
        reportSlNo: 'ಕ್ರ. ಸಂ.',
        reportDate: 'ದಿನಾಂಕ',
        reportCustomerName: 'ಗ್ರಾಹಕರ ಹೆಸರು',
        reportPhone: 'ಫೋನ್',
        reportAmount: 'ಮೊತ್ತ',
        reportTotalCollection: 'ಒಟ್ಟು ಸಂಗ್ರಹ:',
        reportTotalCustomers: 'ಒಟ್ಟು ಗ್ರಾಹಕರು',
        reportGeneratedBy: 'ರಚಿಸಿದವರು',
        reportUnknown: 'ತಿಳಿದಿಲ್ಲ',

        // Phase 9 - UX
        pressBackAgain: 'ನಿರ್ಗಮಿಸಲು ಮತ್ತೊಮ್ಮೆ ಒತ್ತಿ',
        loginNotification: 'ಲಾಗಿನ್ ಅಧಿಸೂಚನೆ',
        loginNotificationBody: 'ನೀವು ಪಿಗ್ಮೀ ರೆಕಾರ್ಡ್ ಮ್ಯಾನೇಜರ್‌ಗೆ ಲಾಗ್ ಇನ್ ಆಗಿದ್ದೀರಿ'
    },
    hi: {
        // App
        appName: 'पिग्मी',
        appSubtitle: 'रिकॉर्ड मैनेजर',

        // Navigation
        navDashboard: 'होम',
        navCustomers: 'ग्राहक',
        navDailyEntry: 'दैनिक एंट्री',
        navCollect: 'कलेक्ट',
        navRecords: 'रिकॉर्ड',

        // Dashboard Stats
        statTotalCustomers: 'कुल ग्राहक',
        statTotalCollected: 'कुल संग्रह',
        statPendingAmount: 'बकाया राशि',
        statTodayCollection: 'आज का संग्रह',

        // Dashboard Cards
        collectionEfficiency: 'आज की संग्रह दक्षता',
        expected: 'अपेक्षित',
        actual: 'वास्तविक',
        attentionNeeded: 'ध्यान दें',
        noMissedPayments: 'सभी ग्राहक अप टू डेट हैं',
        recentPayments: 'हाल की पेमेंट',
        upcomingDeadlines: 'आने वाली समय-सीमाएं',
        noPaymentsYet: 'अभी कोई पेमेंट रिकॉर्ड नहीं हुई',
        noDeadlines: 'कोई आने वाली समय-सीमा नहीं',

        // Customer
        noCustomersYet: 'अभी कोई ग्राहक जोड़ा नहीं गया',
        clickAddCustomer: 'शुरू करने के लिए "ग्राहक जोड़ें" पर क्लिक करें',
        noCustomersFound: 'कोई ग्राहक नहीं मिला',
        tryDifferentSearch: 'कोई दूसरा खोज शब्द आजमाएं',
        searchCustomersPlaceholder: 'नाम या फोन से ग्राहक खोजें...',
        searchCustomerPlaceholder: 'ग्राहक खोजें...',

        // Customer Card Labels
        customerType: 'ग्राहक प्रकार',
        loanCustomer: 'लोन ग्राहक',
        savingCustomer: 'सेविंग ग्राहक',
        loanAmount: 'लोन राशि',
        savingAmount: 'सेविंग राशि',
        issuedDate: 'जारी तारीख',
        deadline: 'समय-सीमा',
        collected: 'संग्रहित',
        pending: 'बकाया',
        collectionProgress: 'संग्रह प्रगति',

        // Daily Entry
        entryDate: 'एंट्री तारीख',
        noCustomersToShow: 'दिखाने के लिए कोई ग्राहक नहीं',
        addCustomersFirst: 'दैनिक एंट्री शुरू करने के लिए पहले ग्राहक जोड़ें',
        orEnterManually: 'या राशि मैन्युअल रूप से दर्ज करें',
        save: 'सेव',
        paid: 'भुगतान किया',
        pendingStatus: 'बकाया',
        loan: 'लोन',

        // Records
        noRecords: 'दिखाने के लिए कोई रिकॉर्ड नहीं',
        recordsWillAppear: 'पेमेंट दर्ज होने के बाद रिकॉर्ड दिखाई देंगे',
        noPaymentsRecorded: 'कोई पेमेंट रिकॉर्ड नहीं हुई',
        progress: 'प्रगति',
        date: 'तारीख',
        amount: 'राशि',
        runningTotal: 'चलता कुल',

        // Modal
        addNewCustomer: 'नया ग्राहक जोड़ें',
        editCustomer: 'ग्राहक संपादित करें',
        customerRecord: 'ग्राहक रिकॉर्ड',
        labelCustomerName: 'ग्राहक का नाम <span class="required">*</span>',
        labelPhone: 'फोन नंबर <span class="required">*</span>',
        labelCustomerType: 'ग्राहक प्रकार <span class="required">*</span>',
        labelLoanAmount: 'लोन राशि (₹) <span class="required">*</span>',
        labelSavingAmount: 'सेविंग राशि (₹) <span class="required">*</span>',
        labelIssuedDate: 'जारी तारीख <span class="required">*</span>',
        labelDeadline: 'समय-सीमा <span class="required">*</span>',
        phCustomerName: 'पूरा नाम दर्ज करें',
        phPhone: 'फोन नंबर दर्ज करें',
        phLoanAmount: 'लोन राशि दर्ज करें',
        phSavingAmount: 'सेविंग राशि दर्ज करें',
        btnCancel: 'रद्द करें',
        btnSaveCustomer: 'ग्राहक सेव करें',
        btnUpdateCustomer: 'ग्राहक अपडेट करें',
        addCustomer: 'ग्राहक जोड़ें',

        // Detail Modal
        totalPaid: 'कुल भुगतान',
        overallProgress: 'कुल प्रगति',
        paymentHistory: 'पेमेंट हिस्ट्री',
        entries: 'एंट्री',
        noPaymentsRecordedYet: 'अभी कोई पेमेंट रिकॉर्ड नहीं हुई',

        // Toasts
        customerAdded: 'ग्राहक सफलतापूर्वक जोड़ा गया!',
        customerUpdated: 'ग्राहक सफलतापूर्वक अपडेट हुआ!',
        customerDeleted: 'ग्राहक सफलतापूर्वक हटाया गया!',
        paymentDeleted: 'पेमेंट हटाई गई!',
        selectDateFirst: 'कृपया पहले तारीख चुनें!',
        selectOrEnterAmount: 'कृपया राशि चुनें या दर्ज करें!',
        amountRecorded: 'के लिए रिकॉर्ड किया गया',
        customer: 'ग्राहक',

        // Confirm
        confirmDeleteCustomer: 'क्या आप वाकई इस ग्राहक को हटाना चाहते हैं? सभी पेमेंट रिकॉर्ड भी हट जाएंगे.',
        confirmDeletePayment: 'यह पेमेंट एंट्री हटाएं?',
        confirmCancel: 'रद्द करें',
        confirmDelete: 'हटाएं',

        // Deadline badges
        dOverdue: 'दिन overdue',
        dLeft: 'दिन बाकी',

        // Lang toggle
        langSwitch: 'English',

        // Navigation
        navSettings: 'सेटिंग्स',

        // Settings Page
        settingsBusinessProfile: 'व्यवसाय प्रोफाइल',
        settingsBusinessName: 'व्यवसाय का नाम',
        settingsBusinessNameDesc: 'साइडबार और एक्सपोर्ट में दिखाया जाने वाला नाम',
        settingsBusinessNamePh: 'व्यवसाय का नाम दर्ज करें',
        settingsOwnerName: 'मालिक का नाम',
        settingsOwnerNameDesc: 'रिकॉर्ड के लिए आपका नाम',
        settingsOwnerNamePh: 'मालिक का नाम दर्ज करें',
        settingsSaved: 'सेटिंग्स सेव हुईं!',

        settingsAppLock: 'ऐप लॉक',
        settingsEnableBiometric: 'फिंगरप्रिंट / बायोमेट्रिक',
        settingsEnableBiometricDesc: 'ऐप अनलॉक करने के लिए डिवाइस फिंगरप्रिंट का उपयोग करें',
        settingsEnablePin: 'PIN लॉक',
        settingsEnablePinDesc: 'ऐप खोलने के लिए 4-अंकों का PIN जरूरी करें',
        settingsChangePin: 'PIN बदलें',
        settingsChangePinDesc: 'अपना वर्तमान PIN अपडेट करें',
        setPinTitle: 'PIN सेट करें',
        changePinTitle: 'PIN बदलें',
        enterNewPin: 'नया 4-अंकों का PIN दर्ज करें',
        confirmNewPin: 'अपना PIN कन्फर्म करें',
        enterCurrentPin: 'वर्तमान PIN दर्ज करें',
        enterPinToUnlock: 'अनलॉक करने के लिए PIN दर्ज करें',
        pinSet: 'PIN सेट हो गया!',
        pinChanged: 'PIN सफलतापूर्वक बदल गया!',
        pinRemoved: 'PIN लॉक बंद किया गया!',
        pinMismatch: 'PIN मेल नहीं खा रहे. फिर कोशिश करें.',
        wrongPin: 'गलत PIN. फिर कोशिश करें.',
        wrongCurrentPin: 'वर्तमान PIN गलत है.',

        settingsDefaults: 'डिफॉल्ट',
        settingsDefaultAmount: 'डिफॉल्ट राशि',
        settingsDefaultAmountDesc: 'डिफॉल्ट दैनिक संग्रह राशि',

        settingsBackupRestore: 'बैकअप और रिस्टोर',
        settingsExportBackup: 'बैकअप एक्सपोर्ट करें',
        settingsExportBackupDesc: 'सारा डेटा JSON फाइल के रूप में डाउनलोड करें',
        settingsImportBackup: 'बैकअप इम्पोर्ट करें',
        settingsImportBackupDesc: 'बैकअप फाइल से डेटा रिस्टोर करें',
        backupExported: 'बैकअप सफलतापूर्वक एक्सपोर्ट हुआ!',
        syncingBeforeLogout: 'लॉगआउट से पहले सिंक हो रहा है...',
        fetchingAccountData: 'खाता डेटा लिया जा रहा है...',
        backupImported: 'बैकअप सफलतापूर्वक इम्पोर्ट हुआ! डेटा रिस्टोर हो गया.',
        backupInvalid: 'अमान्य बैकअप फाइल. कृपया मान्य JSON बैकअप चुनें.',
        confirmImportBackup: 'यह मौजूदा सारा डेटा बैकअप से बदल देगा. क्या आप निश्चित हैं?',
        confirmImportBtn: 'इम्पोर्ट',

        settingsDangerZone: 'डेंजर जोन',
        settingsClearAll: 'सारा डेटा हटाएं',
        settingsClearAllDesc: 'सभी ग्राहक, पेमेंट और सेटिंग्स स्थायी रूप से हटाएं',
        confirmClearAll: 'क्या आप पूरी तरह निश्चित हैं? इससे सभी ग्राहक, पेमेंट और सेटिंग्स स्थायी रूप से हट जाएंगी. इसे वापस नहीं किया जा सकता!',
        confirmClearBtn: 'सब कुछ हटाएं',
        dataCleared: 'सारा डेटा हटा दिया गया!',

        settingsAboutVersion: 'पिग्मी रिकॉर्ड मैनेजर v1.0.0',
        settingsAboutCredit: 'Guru द्वारा बनाया गया',

        // Phase 2 - Interest
        labelInterestRate: 'ब्याज दर (% मासिक)',
        phInterestRate: 'जैसे 2',
        interestRate: 'ब्याज दर',
        totalRepayable: 'कुल चुकाने योग्य',
        interestEarned: 'ब्याज',
        principalAmount: 'मूलधन',
        monthlyInterest: '/माह',

        // Phase 2 - Loan Status
        filterAll: 'सभी',
        filterActive: 'सक्रिय',
        filterClosed: 'बंद',
        statusActive: 'सक्रिय',
        statusClosed: 'बंद',
        closeLoan: 'लोन बंद करें',
        renewLoan: 'लोन रिन्यू करें',
        loanClosed: 'लोन सफलतापूर्वक बंद हुआ!',
        loanRenewed: 'लोन रिन्यू हुआ! नया चक्र शुरू हुआ.',
        confirmCloseLoan: 'इस लोन को बंद मार्क करें? ग्राहक को बंद सूची में ले जाया जाएगा.',
        confirmClose: 'बंद करें',

        // Phase 2 - Edit Payment
        editPayment: 'पेमेंट संपादित करें',
        editPaymentTitle: 'पेमेंट संपादित करें',
        editAmount: 'राशि (₹)',
        editDate: 'तारीख',
        paymentUpdated: 'पेमेंट अपडेट हुई!',
        btnSave: 'सेव',
        btnUpdate: 'अपडेट',

        // Phase 3 - Reports
        navReports: 'रिपोर्ट',
        reportsThisMonth: 'इस महीने',
        reportsActiveLoans: 'सक्रिय लोन',
        reportsDefaulters: 'डिफॉल्टर',
        reportsCollectionTrend: 'संग्रह ट्रेंड (पिछले 30 दिन)',
        reportsDefaultersList: 'डिफॉल्टर सूची (>3 दिन overdue)',
        reportsDataExport: 'डेटा एक्सपोर्ट (Excel/CSV)',
        exportCustomers: 'ग्राहक एक्सपोर्ट करें',
        exportPayments: 'पेमेंट एक्सपोर्ट करें',
        exportToday: 'आज की रिपोर्ट',
        exportWeek: 'इस सप्ताह की रिपोर्ट',
        exportMonth: 'इस महीने की रिपोर्ट',
        exportCustom: 'कस्टम रेंज',
        dateFrom: 'तारीख से',
        dateTo: 'तारीख तक',
        exportReport: 'रिपोर्ट एक्सपोर्ट करें',
        generatePeriodicReports: 'आवधिक रिपोर्ट बनाएं',
        selectAtLeastOne: 'कृपया कम से कम एक रिपोर्ट प्रकार चुनें!',
        exportSuccessful: 'एक्सपोर्ट सफल हुआ!',
        reportTitleToday: 'आज की संग्रह रिपोर्ट',
        reportTitleWeek: 'साप्ताहिक संग्रह रिपोर्ट',
        reportTitleMonth: 'मासिक संग्रह रिपोर्ट',
        reportTitleCustom: 'कस्टम संग्रह रिपोर्ट',
        noDefaulters: 'कोई डिफॉल्टर नहीं 🎉',
        allCustomersPaying: 'सभी सक्रिय ग्राहक समय पर भुगतान कर रहे हैं!',
        daysOverdue: 'दिन',
        overdueLabel: 'overdue',

        // Phase 4 - Areas, Bulk Entry, Reminders
        lblCustomerArea: 'क्षेत्र / रूट',
        allAreas: 'सभी क्षेत्र',
        btnBatchCollect: 'बैच कलेक्ट',
        bulkCollectTitle: 'बैच कलेक्ट',
        lblBulkAmount: 'प्रति ग्राहक राशि (₹)',
        btnConfirmBulk: 'संग्रह कन्फर्म करें',
        selectedCustomers: 'चुने गए',
        btnSendReminder: 'रिमाइंडर भेजें',
        reminderMessage: 'नमस्ते {name}, यह एक विनम्र रिमाइंडर है कि आपकी पिग्मी पेमेंट {amount} बकाया है. कृपया जल्द भुगतान की व्यवस्था करें. धन्यवाद!',

        // Phase 6 - Sort
        sortNameAsc: 'नाम (A-Z)',
        sortNameDesc: 'नाम (Z-A)',
        sortAmountDesc: 'राशि (ज्यादा-कम)',
        sortDeadlineAsc: 'समय-सीमा (सबसे नजदीक)',
        sortNewest: 'हाल ही में जोड़े गए',

        // Phase 7 - Undo
        undo: 'अनडू',
        confirmUndo: 'क्या आप वाकई इस कार्रवाई को अनडू करना चाहते हैं?',
        actionUndone: 'कार्रवाई सफलतापूर्वक अनडू हुई.',
        appearance: 'दिखावट',
        themeMode: 'थीम मोड',
        themeModeDesc: 'लाइट और डार्क मोड के बीच स्विच करें.',

        // Phase 8 - Export Reports
        reportSlNo: 'क्र. सं.',
        reportDate: 'तारीख',
        reportCustomerName: 'ग्राहक का नाम',
        reportPhone: 'फोन नंबर',
        reportAmount: 'संग्रहित राशि',
        reportTotalCollection: 'कुल संग्रह',
        reportTotalCustomers: 'कुल ग्राहक',
        reportGeneratedBy: 'बनाने वाले',
        reportUnknown: 'अज्ञात',

        // Phase 9 - UX
        pressBackAgain: 'बाहर निकलने के लिए फिर से दबाएं',
        loginNotification: 'लॉगिन नोटिफिकेशन',
        loginNotificationBody: 'आप पिग्मी रिकॉर्ड मैनेजर में लॉग इन हो गए हैं'
    }
};

function t(key) {
    return TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.en[key] || key;
}

function getCurrentLocale() {
    return LANGUAGE_LOCALES[currentLang] || LANGUAGE_LOCALES.en;
}

function getLocalizedCustomerName(customer) {
    if (!customer) return t('reportUnknown');
    return (currentLang === 'kn' && customer.nameKn) ? customer.nameKn : customer.name;
}

function applyTranslations() {
    // Text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });

    // innerHTML (for labels with <span> required markers)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        el.innerHTML = t(key);
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = t(key);
    });

    // Language toggle dropdown
    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
        langSelect.value = currentLang;
    }
    // Body class for font
    document.body.classList.toggle('lang-kn', currentLang === 'kn');
    document.body.classList.toggle('lang-hi', currentLang === 'hi');

    updateCustomerAmountLabel();
}

function changeLanguage(event) {
    const selectedLang = event.target.value;
    if (SUPPORTED_LANGUAGES.includes(selectedLang)) {
        currentLang = selectedLang;
        localStorage.setItem(STORAGE_KEYS.LANGUAGE, currentLang);
        applyTranslations();
        updateCurrentDateDisplay();
        // Re-render page title for current view
        updatePageTitle();
        refreshCurrentView();
    }
}

function updatePageTitle() {
    const titleKeys = {
        'dashboard': 'navDashboard',
        'customers': 'navCustomers',
        'daily-entry': 'navDailyEntry',
        'records': 'navRecords',
        'reports': 'navReports',
        'settings': 'navSettings'
    };
    if (appMode === 'org' && currentView === 'dashboard') {
        document.getElementById('pageTitle').textContent = currentOrg ? currentOrg.name : 'Organization';
    } else {
        document.getElementById('pageTitle').textContent = t(titleKeys[currentView]);
    }

    // Update top action button text
    const topAction = document.getElementById('topAction');
    const topActionText = document.getElementById('topActionText');
    if (currentView === 'dashboard' || currentView === 'customers') {
        topAction.style.display = 'inline-flex';
        topActionText.textContent = t('addCustomer');
    } else {
        topAction.style.display = 'none';
    }
}

// === Helpers ===
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 11);
}

function generateCustomerId() {
    return 'CUST-' + Math.floor(100000 + Math.random() * 900000).toString();
}

// === IndexedDB Backend & Memory Cache ===
var db;
let _customersCache = [];
let _paymentsCache = [];

async function clearLocalDatabase() {
    return new Promise((resolve, reject) => {
        if (!db) {
            _customersCache = [];
            _paymentsCache = [];
            resolve();
            return;
        }

        const tx = db.transaction(['customers', 'payments'], 'readwrite');
        const customersStore = tx.objectStore('customers');
        const paymentsStore = tx.objectStore('payments');

        customersStore.clear();
        paymentsStore.clear();

        tx.oncomplete = () => {
            _customersCache = [];
            _paymentsCache = [];
            resolve();
        };
        tx.onerror = (e) => reject(e.target.error);
    });
}

async function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('PigmieDB', 2);

        request.onupgradeneeded = (event) => {
            const upgradeDb = event.target.result;
            if (!upgradeDb.objectStoreNames.contains('customers')) {
                upgradeDb.createObjectStore('customers', { keyPath: 'id' });
            }
            if (!upgradeDb.objectStoreNames.contains('payments')) {
                upgradeDb.createObjectStore('payments', { keyPath: 'id' });
            }
            if (!upgradeDb.objectStoreNames.contains('org_customers')) {
                upgradeDb.createObjectStore('org_customers', { keyPath: 'id' });
            }
            if (!upgradeDb.objectStoreNames.contains('org_payments')) {
                upgradeDb.createObjectStore('org_payments', { keyPath: 'id' });
            }
            if (!upgradeDb.objectStoreNames.contains('org_meta')) {
                upgradeDb.createObjectStore('org_meta', { keyPath: 'key' });
            }
        };

        request.onsuccess = (event) => {
            db = event.target.result;
            // Always load personal data stores initially
            loadFromDB('customers').then(customers => {
                _customersCache = customers || [];
                loadFromDB('payments').then(payments => {
                    _paymentsCache = payments || [];
                    migrateFromLocalStorage();
                    resolve();
                });
            });
        };

        request.onerror = (event) => {
            console.error('IndexedDB error:', event.target.error);
            reject(event.target.error);
        };
    });
}

function loadFromDB(storeName) {
    return new Promise((resolve) => {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => resolve([]);
    });
}

function saveToDB(storeName, items) {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    store.clear();
    items.forEach(item => store.put(item));
}

function migrateFromLocalStorage() {
    const localCustomers = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    const localPayments = localStorage.getItem(STORAGE_KEYS.PAYMENTS);

    let migrated = false;

    if (localCustomers && _customersCache.length === 0) {
        _customersCache = JSON.parse(localCustomers);
        saveToDB('customers', _customersCache);
        localStorage.removeItem(STORAGE_KEYS.CUSTOMERS);
        migrated = true;
    }

    if (localPayments && _paymentsCache.length === 0) {
        _paymentsCache = JSON.parse(localPayments);
        saveToDB('payments', _paymentsCache);
        localStorage.removeItem(STORAGE_KEYS.PAYMENTS);
        migrated = true;
    }

    if (migrated) {
        console.log('Successfully migrated data from localStorage to IndexedDB.');
    }
}

function getCustomers() {
    return _customersCache;
}

function saveCustomers(customers) {
    _customersCache = customers;
    
    // Only persist to IndexedDB in personal mode. 
    // In org mode, dbSaveCustomer handles Firestore writes directly.
    if (typeof appMode === 'undefined' || appMode !== 'org') {
        if (typeof saveToDB === 'function') saveToDB('customers', customers);
        if (typeof pushToCloud === 'function') pushToCloud(false);
    }
}

function getPayments() {
    return _paymentsCache;
}

function savePayments(payments) {
    _paymentsCache = payments;
    
    // Only persist to IndexedDB in personal mode.
    if (typeof appMode === 'undefined' || appMode !== 'org') {
        if (typeof saveToDB === 'function') saveToDB('payments', payments);
        if (typeof pushToCloud === 'function') pushToCloud(false);
    }
}

function formatCurrency(amount) {
    return '₹' + Number(amount).toLocaleString(getCurrentLocale());
}

function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString(getCurrentLocale(), { day: '2-digit', month: 'short', year: 'numeric' });
}

function updateCurrentDateDisplay() {
    const currentDateEl = document.getElementById('currentDate');
    if (!currentDateEl) return;

    const now = new Date();
    currentDateEl.textContent = now.toLocaleDateString(getCurrentLocale(), {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function getDisplayName(customer) {
    return getLocalizedCustomerName(customer);
}

function getInitials(name) {
    return name ? name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2) : '?';
}

function getAvatarHtml(customer, baseClass = 'customer-avatar') {
    if (customer.photo) {
        return `<div class="${baseClass} has-photo" style="background-image: url('${customer.photo}'); background-size: cover; background-position: center;"></div>`;
    }
    return `<div class="${baseClass}">${getInitials(getDisplayName(customer))}</div>`;
}

function getTodayStr() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function daysUntil(dateStr) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const target = new Date(dateStr);
    target.setHours(0, 0, 0, 0);
    return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

function getCustomerTotalPaid(customerId) {
    const payments = getPayments().filter(p => p.customerId === customerId);
    return payments.reduce((sum, p) => sum + p.amount, 0);
}

function getCustomerPayments(customerId) {
    return getPayments().filter(p => p.customerId === customerId).sort((a, b) => new Date(b.date) - new Date(a.date));
}

function getCustomerType(customer) {
    return customer && customer.customerType === 'saving' ? 'saving' : 'loan';
}

function getCustomerTypeLabel(customer) {
    return t(getCustomerType(customer) === 'saving' ? 'savingCustomer' : 'loanCustomer');
}

function getCustomerAmountLabel(customer) {
    return t(getCustomerType(customer) === 'saving' ? 'savingAmount' : 'loanAmount');
}

function getCustomerStatus(customer) {
    return customer && customer.status === 'closed' ? 'closed' : 'active';
}

function calculateTotalRepayable(customer) {
    if (!customer || getCustomerType(customer) === 'saving') return customer.loanAmount;
    const rate = customer.interestRate || 0;
    if (rate <= 0) return customer.loanAmount;
    // Calculate months between issued date and deadline
    const start = new Date(customer.issuedDate);
    const end = new Date(customer.deadline);
    const months = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24 * 30.44)));
    const interest = (customer.loanAmount * rate * months) / 100;
    return customer.loanAmount + interest;
}

function getInterestAmount(customer) {
    return calculateTotalRepayable(customer) - customer.loanAmount;
}

// === Toast Notifications ===
function showToast(message, type = 'success', action = null) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
        error: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
        info: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
    };

    let innerHTML = `<div style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'}-400)">${icons[type]}</span>${message}</div>`;

    if (action) {
        innerHTML += `<button class="toast-action-btn" onclick="event.stopPropagation();">${action.label}</button>`;
    }

    toast.innerHTML = innerHTML;

    if (action) {
        const btn = toast.querySelector('.toast-action-btn');
        btn.onclick = () => {
            action.onClick();
            toast.style.animation = 'toastOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        };
    }

    container.appendChild(toast);

    // If there's an action, keep toast longer
    const timeoutDuration = action ? 8000 : 3000;
    setTimeout(() => {
        if (document.body.contains(toast)) {
            toast.style.animation = 'toastOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }
    }, timeoutDuration);
}

// === Confirm Dialog ===
function showConfirm(message) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'confirm-overlay';
        overlay.innerHTML = `
            <div class="confirm-dialog">
                <p>${message}</p>
                <div class="confirm-actions">
                    <button class="btn btn-secondary" id="confirmCancel">${t('confirmCancel')}</button>
                    <button class="btn btn-danger" id="confirmOk">${t('confirmDelete')}</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        overlay.querySelector('#confirmCancel').onclick = () => {
            overlay.remove();
            resolve(false);
        };
        overlay.querySelector('#confirmOk').onclick = () => {
            overlay.remove();
            resolve(true);
        };
    });
}

function showDangerConfirm(message) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'confirm-overlay';
        overlay.innerHTML = `
            <div class="confirm-dialog" style="border: 2px solid var(--danger-color, #ef4444);">
                <div style="font-size: 48px; text-align: center; margin-bottom: 8px;">⚠️</div>
                <h3 style="color: var(--danger-color, #ef4444); text-align: center; margin: 0 0 12px 0; font-weight: 800;">WARNING</h3>
                <p style="text-align: center; font-weight: 600; font-size: 1.1rem; line-height: 1.4;">${message}</p>
                <div class="confirm-actions" style="margin-top: 20px;">
                    <button class="btn btn-secondary" id="confirmCancel">${t('confirmCancel')}</button>
                    <button class="btn btn-danger" id="confirmOk" style="font-weight: bold;">${t('confirmDelete')}</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        overlay.querySelector('#confirmCancel').onclick = () => {
            overlay.remove();
            resolve(false);
        };
        overlay.querySelector('#confirmOk').onclick = () => {
            overlay.remove();
            resolve(true);
        };
    });
}

// === Navigation ===
let currentView = 'dashboard';
let customerFilter = 'all';

function switchView(viewName) {
    currentView = viewName;

    // Update bottom nav items
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.view === viewName);
    });

    // Update views
    document.querySelectorAll('.view').forEach(view => {
        let targetViewId = `view-${viewName}`;
        if (viewName === 'dashboard' && typeof appMode !== 'undefined' && appMode === 'org' && canPerform('VIEW_ORG_DASHBOARD')) {
            targetViewId = 'view-org-dashboard';
        }
        view.classList.toggle('active', view.id === targetViewId);
    });

    // Update page title and action button
    updatePageTitle();

    // Refresh view data
    refreshCurrentView();
}

function handleTopAction() {
    openCustomerModal();
}

function toggleSidebar() {
    // Legacy — no-op since sidebar is removed
}

function viewAllTodayPayments() {
    const today = getTodayStr();
    const dateInput = document.getElementById('recordFilterDate');
    if (dateInput) {
        dateInput.value = today;
    }
    const searchInput = document.getElementById('recordsSearch');
    if (searchInput) {
        searchInput.value = '';
    }
    switchView('records');
}

// === Dashboard ===
function refreshDashboard() {
    if (appMode === 'org') {
        if (typeof refreshOrgDashboard === 'function') {
            refreshOrgDashboard();
        }
    }

    const customers = getCustomers();
    const payments = getPayments();
    const today = getTodayStr();

    // Stats
    const totalCustomers = customers.length;
    const totalCollected = payments.reduce((sum, p) => sum + p.amount, 0);
    const totalRepayableAll = customers.reduce((sum, c) => sum + calculateTotalRepayable(c), 0);
    const pendingAmount = totalRepayableAll - totalCollected;
    const todayPayments = payments.filter(p => p.date === today);
    const todayCollection = todayPayments.reduce((sum, p) => sum + p.amount, 0);

    let todayLoans = 0;
    let todaySavings = 0;
    todayPayments.forEach(p => {
        const cust = customers.find(c => c.id === p.customerId);
        if (cust && cust.customerType === 'saving') {
            todaySavings += p.amount;
        } else {
            // Default to loan for historical records, deleted customers, or standard loans
            todayLoans += p.amount;
        }
    });

    document.getElementById('statTotalCustomers').textContent = totalCustomers;
    document.getElementById('statTotalCollected').textContent = formatCurrency(totalCollected);
    document.getElementById('statPendingAmount').textContent = formatCurrency(Math.max(0, pendingAmount));
    document.getElementById('statTodayCollection').textContent = formatCurrency(todayCollection);
    
    if (document.getElementById('statTodayLoans')) {
        document.getElementById('statTodayLoans').textContent = formatCurrency(todayLoans);
    }
    if (document.getElementById('statTodaySavings')) {
        document.getElementById('statTodaySavings').textContent = formatCurrency(todaySavings);
    }

    // Recent Payments
    const recentPaymentsEl = document.getElementById('recentPayments');
    const recentPayments = [...payments].sort((a, b) => {
        const dateCompare = new Date(b.date) - new Date(a.date);
        if (dateCompare !== 0) return dateCompare;
        return (b.timestamp || 0) - (a.timestamp || 0);
    }).slice(0, 8);

    if (recentPayments.length === 0) {
        recentPaymentsEl.innerHTML = `
            <div class="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                <p>${t('noPaymentsYet')}</p>
            </div>`;
    } else {
        recentPaymentsEl.innerHTML = recentPayments.map(p => {
            const customer = customers.find(c => c.id === p.customerId);
            if (!customer) return '';
            return `
                <div class="payment-item">
                    <div class="payment-info">
                        ${getAvatarHtml(customer, 'payment-avatar')}
                        <div>
                            <div class="payment-name">${getDisplayName(customer)}</div>
                            <div class="payment-date">${formatDate(p.date)}</div>
                        </div>
                    </div>
                    <div class="payment-amount">+${formatCurrency(p.amount)}</div>
                </div>`;
        }).join('');
    }

    // Analytics: Collection Efficiency
    const settings = getSettings();
    const defaultAmount = settings.defaultAmount || 100;
    const activeCustomers = customers.filter(c => getCustomerStatus(c) !== 'closed');
    const expectedCollection = activeCustomers.reduce((sum, c) => sum + defaultAmount, 0);

    const effPercentage = expectedCollection > 0 ? Math.min(100, (todayCollection / expectedCollection) * 100) : 0;

    const effExpectedEl = document.getElementById('effExpected');
    const effActualEl = document.getElementById('effActual');
    const effPercentageEl = document.getElementById('effPercentage');
    const effProgressBarEl = document.getElementById('effProgressBar');

    if (effExpectedEl) {
        effExpectedEl.textContent = `${t('expected')}: ${formatCurrency(expectedCollection)}`;
        effActualEl.textContent = `${t('actual')}: ${formatCurrency(todayCollection)}`;
        effPercentageEl.textContent = `${Math.round(effPercentage)}%`;
        effProgressBarEl.style.width = `${effPercentage}%`;
    }

    // Attention Needed: Missed 3+ Days
    const attentionNeededEl = document.getElementById('attentionNeededList');
    if (attentionNeededEl) {
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        threeDaysAgo.setHours(0, 0, 0, 0);

        const missedCustomers = activeCustomers.filter(c => {
            const cPayments = getCustomerPayments(c.id);
            if (cPayments.length === 0) return true; // Never paid

            const lastPaymentDate = new Date(Math.max(...cPayments.map(p => new Date(p.date))));
            lastPaymentDate.setHours(0, 0, 0, 0);
            return lastPaymentDate < threeDaysAgo;
        }).slice(0, 5); // Show top 5 to keep dashboard clean

        if (missedCustomers.length === 0) {
            attentionNeededEl.innerHTML = `
                <div class="empty-state">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <p>${t('noMissedPayments')}</p>
                </div>`;
        } else {
            attentionNeededEl.innerHTML = missedCustomers.map(c => {
                const cPayments = getCustomerPayments(c.id);
                const totalPaid = cPayments.reduce((sum, p) => sum + p.amount, 0);
                const totalRepayable = calculateTotalRepayable(c);
                const pending = Math.max(0, totalRepayable - totalPaid);

                return `
                    <div class="attention-item">
                        <div class="attention-info">
                            <h4>${c.name}</h4>
                            <p>${c.phone} - ${t('pending')}: ${formatCurrency(pending)}</p>
                        </div>
                        <button class="btn-whatsapp" onclick="sendReminder('${c.phone}', '${formatCurrency(pending)}', '${c.name}')" style="padding: 6px; border-radius: 50%;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                        </button>
                    </div>`;
            }).join('');
        }
    }

    // Upcoming Deadlines
    const upcomingDeadlinesEl = document.getElementById('upcomingDeadlines');
    const sortedCustomers = customers
        .filter(c => c.deadline && getCustomerStatus(c) !== 'closed')
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        .slice(0, 8);

    if (sortedCustomers.length === 0) {
        upcomingDeadlinesEl.innerHTML = `
            <div class="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <p>${t('noDeadlines')}</p>
            </div>`;
    } else {
        upcomingDeadlinesEl.innerHTML = sortedCustomers.map(c => {
            const days = daysUntil(c.deadline);
            let badgeClass, badgeText;
            if (days < 0) {
                badgeClass = 'overdue';
                badgeText = `${Math.abs(days)}${t('dOverdue')}`;
            } else if (days <= 7) {
                badgeClass = 'urgent';
                badgeText = `${days}${t('dLeft')}`;
            } else if (days <= 30) {
                badgeClass = 'soon';
                badgeText = `${days}${t('dLeft')}`;
            } else {
                badgeClass = 'safe';
                badgeText = `${days}${t('dLeft')}`;
            }
            return `
                <div class="deadline-item">
                    <div class="deadline-info">
                        <div class="deadline-name">${c.name}</div>
                        <div class="deadline-date">${formatDate(c.deadline)}</div>
                    </div>
                    <span class="deadline-badge ${badgeClass}">${badgeText}</span>
                </div>`;
        }).join('');
    }
}

// === Customers ===
function refreshCustomersList() {
    const customers = getCustomers();
    const searchVal = document.getElementById('customerSearch').value.toLowerCase();
    const sortVal = document.getElementById('customerSort') ? document.getElementById('customerSort').value : 'newest';

    let filtered = customers.filter(c =>
        c.name.toLowerCase().includes(searchVal) ||
        c.phone.includes(searchVal)
    );

    // Apply status filter
    if (customerFilter === 'active') {
        filtered = filtered.filter(c => getCustomerStatus(c) !== 'closed');
    } else if (customerFilter === 'closed') {
        filtered = filtered.filter(c => getCustomerStatus(c) === 'closed');
    }

    // Apply type filter
    const typeFilterEl = document.getElementById('customerTypeFilter');
    if (typeFilterEl && typeFilterEl.value !== 'all') {
        filtered = filtered.filter(c => {
            const cType = c.customerType || 'loan'; // default historical records to loan
            return cType === typeFilterEl.value;
        });
    }

    // Apply sorting
    filtered.sort((a, b) => {
        if (sortVal === 'name-asc') {
            return a.name.localeCompare(b.name);
        } else if (sortVal === 'name-desc') {
            return b.name.localeCompare(a.name);
        } else if (sortVal === 'amount-desc') {
            return b.loanAmount - a.loanAmount;
        } else if (sortVal === 'deadline-asc') {
            const dA = a.deadline ? new Date(a.deadline).getTime() : Infinity;
            const dB = b.deadline ? new Date(b.deadline).getTime() : Infinity;
            return dA - dB;
        } else {
            // Newest (Default)
            const dA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            if (dA !== dB) return dB - dA;
            return b.id.localeCompare(a.id);
        }
    });

    // Update filter button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === customerFilter);
    });

    const container = document.getElementById('customersList');

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <p>${searchVal ? t('noCustomersFound') : t('noCustomersYet')}</p>
                <span>${searchVal ? t('tryDifferentSearch') : t('clickAddCustomer')}</span>
            </div>`;
        return;
    }

    container.innerHTML = filtered.map((c, index) => {
        const totalPaid = getCustomerTotalPaid(c.id);
        const totalRepayable = calculateTotalRepayable(c);
        const pending = Math.max(0, totalRepayable - totalPaid);
        const progress = totalRepayable > 0 ? Math.min(100, (totalPaid / totalRepayable) * 100) : 0;
        const progressClass = progress >= 100 ? 'complete' : (daysUntil(c.deadline) < 0 && progress < 100 ? 'overdue' : '');
        const customerType = getCustomerType(c);
        const amountLabel = getCustomerAmountLabel(c);
        const status = getCustomerStatus(c);
        const isClosed = status === 'closed';
        const interestAmt = getInterestAmount(c);
        const hasInterest = interestAmt > 0 && customerType === 'loan';

        return `
            <div class="customer-card ${isClosed ? 'closed' : ''}" onclick="viewCustomerDetail('${c.id}')">
                <div class="customer-card-header">
                    <div class="customer-info">
                        ${getAvatarHtml(c, 'customer-avatar')}
                        <div>
                            <div class="customer-name">${index + 1}. ${c.name}</div>
                            <div class="customer-phone">${c.phone}</div>
                            <div class="customer-phone" style="font-family: monospace; font-size: 11px; margin-bottom: 4px;">ID: ${c.id}</div>
                            <span class="customer-type-badge ${customerType}">${getCustomerTypeLabel(c)}</span>
                            <span class="status-badge ${status}">${t(isClosed ? 'statusClosed' : 'statusActive')}</span>
                        </div>
                    </div>
                    <div class="customer-actions" onclick="event.stopPropagation()">
                        <button class="btn-icon" onclick="editCustomer('${c.id}')" title="Edit">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button class="btn-icon" onclick="deleteCustomer('${c.id}')" title="Delete" style="color: var(--danger-400)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                    </div>
                </div>
                <div class="customer-details">
                    <div class="detail-item">
                        <span class="detail-label">${amountLabel}</span>
                        <span class="detail-value amount">${formatCurrency(c.loanAmount)}</span>
                        ${hasInterest ? `<div class="interest-info">${c.interestRate}%${t('monthlyInterest')} · ${t('interestEarned')}: ${formatCurrency(interestAmt)}</div>` : ''}
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">${hasInterest ? t('totalRepayable') : t('customerType')}</span>
                        <span class="detail-value" style="color: ${hasInterest ? 'var(--warning-400)' : 'var(--text-primary)'}">${hasInterest ? formatCurrency(totalRepayable) : getCustomerTypeLabel(c)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">${t('collected')}</span>
                        <span class="detail-value collected">${formatCurrency(totalPaid)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">${t('pending')}</span>
                        <span class="detail-value pending">${formatCurrency(pending)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">${t('issuedDate')}</span>
                        <span class="detail-value" style="color: var(--info-400)">${formatDate(c.issuedDate)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">${t('deadline')}</span>
                        <span class="detail-value deadline">${formatDate(c.deadline)}</span>
                    </div>
                </div>
                <div class="progress-section">
                    <div class="progress-header">
                        <span class="progress-label">${t('collectionProgress')}</span>
                        <span class="progress-percent">${progress.toFixed(1)}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill ${progressClass}" style="width: ${progress}%"></div>
                    </div>
                </div>
            </div>`;
    }).join('');
}

function setCustomerFilter(filter) {
    customerFilter = filter;
    refreshCustomersList();
}

function filterCustomers() {
    refreshCustomersList();
}

// === Customer Modal ===
function updateCustomerAmountLabel() {
    const typeEl = document.getElementById('customerType');
    const amountLabel = document.querySelector('label[for="loanAmount"]');
    const amountInput = document.getElementById('loanAmount');
    const interestGroup = document.getElementById('interestRateGroup');
    const isSaving = typeEl && typeEl.value === 'saving';

    if (amountLabel) {
        amountLabel.innerHTML = t(isSaving ? 'labelSavingAmount' : 'labelLoanAmount');
    }

    if (amountInput) {
        amountInput.placeholder = t(isSaving ? 'phSavingAmount' : 'phLoanAmount');
    }

    // Show/hide interest rate field based on customer type
    if (interestGroup) {
        interestGroup.style.display = isSaving ? 'none' : 'flex';
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal.active').forEach(modal => {
        modal.classList.remove('active');
    });
}

function openCustomerModal(customerId = null) {
    closeAllModals();
    const modal = document.getElementById('customerModal');
    const title = document.getElementById('modalTitle');
    const saveBtn = document.getElementById('saveBtn');
    const form = document.getElementById('customerForm');

    form.reset();
    document.getElementById('customerId').value = '';
    document.getElementById('customerType').value = 'loan';

    // Reset images
    document.getElementById('customerPhotoBase64').value = '';
    document.getElementById('photoPreview').innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>';
    document.getElementById('photoPreview').style.backgroundImage = 'none';

    document.getElementById('idProofBase64').value = '';
    document.getElementById('idProofPreviewImg').src = '';
    document.getElementById('idProofPreviewImg').style.display = 'none';
    document.getElementById('idProofText').style.display = 'block';

    if (customerId) {
        const customer = getCustomers().find(c => c.id === customerId);
        if (customer) {
            title.textContent = t('editCustomer');
            saveBtn.textContent = t('btnUpdateCustomer');
            document.getElementById('customerId').value = customer.id;
            document.getElementById('customerName').value = customer.name;
            document.getElementById('customerPhone').value = customer.phone;
            document.getElementById('custArea').value = customer.area || '';
            document.getElementById('customerType').value = getCustomerType(customer);
            document.getElementById('loanAmount').value = customer.loanAmount;
            document.getElementById('interestRate').value = customer.interestRate || 0;
            document.getElementById('issuedDate').value = customer.issuedDate || '';
            document.getElementById('deadline').value = customer.deadline;

            if (customer.photo) {
                document.getElementById('customerPhotoBase64').value = customer.photo;
                document.getElementById('photoPreview').innerHTML = '';
                document.getElementById('photoPreview').style.backgroundImage = `url(${customer.photo})`;
            }
            if (customer.idProof) {
                document.getElementById('idProofBase64').value = customer.idProof;
                document.getElementById('idProofPreviewImg').src = customer.idProof;
                document.getElementById('idProofPreviewImg').style.display = 'block';
                document.getElementById('idProofText').style.display = 'none';
            }
        }
    } else {
        title.textContent = t('addNewCustomer');
        saveBtn.textContent = t('btnSaveCustomer');
        document.getElementById('interestRate').value = 0;
    }

    updateCustomerAmountLabel();

    // Role-based Access: Agent Assignment
    const assignedGroup = document.getElementById('assignedAgentGroup');
    const assignedSelect = document.getElementById('assignedAgentSelect');
    if (canPerform('ASSIGN_AGENT')) {
        assignedGroup.style.display = 'block';
        if (typeof _orgMembersCache !== 'undefined') {
            let selectableMembers = _orgMembersCache;
            if (currentOrgMemberRole === 'manager') {
                selectableMembers = _orgMembersCache.filter(m => m.role === 'agent' || m.role === 'collector' || m.uid === currentUser.uid);
            }
            assignedSelect.innerHTML = selectableMembers.map(member =>
                `<option value="${member.uid}">${member.email} (${member.role})</option>`
            ).join('');

            // Set default or existing
            if (customerId) {
                const customer = getCustomers().find(c => c.id === customerId);
                if (customer && customer.assignedAgent) {
                    assignedSelect.value = customer.assignedAgent;
                }
            } else if (typeof currentUser !== 'undefined' && currentUser) {
                assignedSelect.value = currentUser.uid;
            }
        }
    } else {
        assignedGroup.style.display = 'none';
        assignedSelect.innerHTML = '';
    }
    modal.classList.add('active');
}

function openModeSelectModal() {
    const modal = document.getElementById('modeSelectModal');
    if (modal) modal.classList.add('active');
}

function closeModeSelectModal() {
    const modal = document.getElementById('modeSelectModal');
    if (modal) modal.classList.remove('active');
}

function closeCustomerModal() {
    document.getElementById('customerModal').classList.remove('active');
}

async function saveCustomer(event) {
    event.preventDefault();

    const id = document.getElementById('customerId').value;
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const area = document.getElementById('custArea').value.trim();
    const customerType = document.getElementById('customerType').value;
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) || 0;
    const issuedDate = document.getElementById('issuedDate').value;
    const deadline = document.getElementById('deadline').value;

    let customerObj;

    if (id) {
        // Update existing
        const customers = getCustomers();
        const existing = customers.find(c => c.id === id);
        if (existing) {
            customerObj = { ...existing, name, phone, area, customerType, loanAmount, interestRate, issuedDate, deadline };
            showToast(t('customerUpdated'));
        }
    } else {
        // Add new
        customerObj = {
            id: generateCustomerId(),
            name,
            phone,
            area,
            customerType,
            loanAmount,
            interestRate,
            issuedDate,
            deadline,
            status: 'active',
            createdAt: getTodayStr()
        };
    }

    if (customerObj) {
        const newPhoto = document.getElementById('customerPhotoBase64').value;
        const newIdProof = document.getElementById('idProofBase64').value;
        if (newPhoto) customerObj.photo = newPhoto;
        if (newIdProof) customerObj.idProof = newIdProof;

        // Tag with agent if in org mode
        if (typeof appMode !== 'undefined' && appMode === 'org' && typeof currentUser !== 'undefined' && currentUser) {
            const assignedGroup = document.getElementById('assignedAgentGroup');
            const assignedSelect = document.getElementById('assignedAgentSelect');

            // If the dropdown is visible, read from it. Otherwise default to current user.
            if (assignedGroup.style.display !== 'none' && assignedSelect.value) {
                customerObj.assignedAgent = assignedSelect.value;
                const selectedOption = assignedSelect.options[assignedSelect.selectedIndex];
                customerObj.assignedAgentName = selectedOption ? selectedOption.text.split(' (')[0] : (currentUser.displayName || currentUser.email);
            } else if (!id) {
                // Only default to current user if it's a new customer
                customerObj.assignedAgent = currentUser.uid;
                customerObj.assignedAgentName = currentUser.displayName || currentUser.email;
            }
        }
        const action = id ? 'EDIT_CUSTOMER' : 'ADD_CUSTOMER';
        
        if (!canPerform(action)) {
            showToast(typeof t === 'function' ? t('noPermission') || 'You do not have permission' : 'You do not have permission', 'error');
            return;
        }

        if (!id) showToast(t('customerAdded'));

        if (typeof appMode !== 'undefined' && appMode === 'org' && typeof dbSaveCustomer === 'function') {
            await dbSaveCustomer(customerObj);
        } else {
            const customers = getCustomers();
            const index = customers.findIndex(c => c.id === customerObj.id);
            if (index !== -1) customers[index] = customerObj;
            else customers.push(customerObj);
            saveCustomers(customers);
        }
    }

    syncKannadaNames(); // Background process to update translation
    closeCustomerModal();
    refreshCurrentView();
}

function editCustomer(customerId) {
    openCustomerModal(customerId);
}

async function deleteCustomer(customerId) {
    const confirmed = await showConfirm(t('confirmDeleteCustomer'));
    if (!confirmed) return;

    let customers = getCustomers();
    const customerToDelete = customers.find(c => c.id === customerId);
    let payments = getPayments();
    const customerPayments = payments.filter(p => p.customerId === customerId);

    if (!canPerform('DELETE_CUSTOMER')) {
        showToast(typeof t === 'function' ? t('noPermission') || 'You do not have permission' : 'You do not have permission', 'error');
        return;
    }

    if (typeof appMode !== 'undefined' && appMode === 'org' && typeof dbDeleteCustomer === 'function') {
        await dbDeleteCustomer(customerId);
        for (const p of customerPayments) {
            if (typeof dbDeletePayment === 'function') await dbDeletePayment(p.id);
        }
    } else {
        customers = customers.filter(c => c.id !== customerId);
        saveCustomers(customers);
        payments = payments.filter(p => p.customerId !== customerId);
        savePayments(payments);
    }

    showToast(t('customerDeleted'), 'success', {
        label: t('undo'),
        onClick: async () => {
            const undoConfirmed = await showConfirm(t('confirmUndo'));
            if (!undoConfirmed) return;

            if (appMode === 'org' && typeof dbSaveCustomer === 'function') {
                dbSaveCustomer(customerToDelete);
                customerPayments.forEach(p => {
                    if (typeof dbSavePayment === 'function') dbSavePayment(p);
                });
            } else {
                let currentCustomers = getCustomers();
                currentCustomers.push(customerToDelete);
                saveCustomers(currentCustomers);
                let currentPayments = getPayments();
                currentPayments = currentPayments.concat(customerPayments);
                savePayments(currentPayments);
            }
            closeCustomerModal();
            refreshCurrentView();
            showToast(t('actionUndone'));
        }
    });
}

// === Customer Detail Modal ===


function viewCustomerDetail(customerId) {
    const customer = getCustomers().find(c => c.id === customerId);
    if (!customer) return;

    const payments = getCustomerPayments(customerId);
    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
    const totalRepayable = calculateTotalRepayable(customer);
    const pending = Math.max(0, totalRepayable - totalPaid);
    const progress = totalRepayable > 0 ? Math.min(100, (totalPaid / totalRepayable) * 100) : 0;
    const customerType = getCustomerType(customer);
    const amountLabel = getCustomerAmountLabel(customer);
    const status = getCustomerStatus(customer);
    const isClosed = status === 'closed';
    const interestAmt = getInterestAmount(customer);
    const hasInterest = interestAmt > 0 && customerType === 'loan';

    const modal = document.getElementById('detailModal');
    const title = document.getElementById('detailModalTitle');
    const body = document.getElementById('detailModalBody');

    title.textContent = t('customerRecord');

    body.innerHTML = `
        <div class="detail-header">
            ${getAvatarHtml(customer, 'detail-avatar')}
            <div>
                <div class="detail-name">${getDisplayName(customer)}</div>
                <div class="detail-phone-text">${customer.phone} ${customer.area ? `· <span style="color: var(--text-muted)">${customer.area}</span>` : ''}</div>
                <div style="font-family: monospace; margin: 4px 0 8px; font-size: 13px; color: var(--text-secondary); line-height: 1.5;">
                    Org ID: <strong style="color: var(--text-primary);">${typeof currentOrg !== 'undefined' && currentOrg ? currentOrg.id : (localStorage.getItem('pigmie_active_org') || 'N/A')}</strong><br>
                    Customer ID: <strong style="color: var(--text-primary);">${customer.id}</strong>
                </div>
                <span class="customer-type-badge ${customerType}">${getCustomerTypeLabel(customer)}</span>
                <span class="status-badge ${status}">${t(isClosed ? 'statusClosed' : 'statusActive')}</span>
                
                ${customer.idProof ? `
                <div style="margin-top: 8px;">
                    <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 0.8rem;" onclick="viewIdProof('${customer.id}')">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                        View ID Proof
                    </button>
                </div>` : ''}
                
                ${!isClosed && pending > 0 ? `
                <div style="margin-top: 12px;">
                    <button class="btn-whatsapp" onclick="sendReminder('${customer.phone}', '${formatCurrency(pending)}', '${getDisplayName(customer)}')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                        ${t('btnSendReminder')}
                    </button>
                </div>` : ''}
            </div>
        </div>
        ${!isClosed && progress >= 100 ? `
        <div class="detail-actions">
            <button class="btn btn-primary" onclick="closeLoan('${customerId}')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                ${t('closeLoan')}
            </button>
        </div>` : ''}
        ${isClosed ? `
        <div class="detail-actions">
            <button class="btn btn-primary" onclick="renewLoan('${customerId}')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
                ${t('renewLoan')}
            </button>
        </div>` : ''}
        <div class="detail-stats">
            <div class="detail-stat-card">
                <div class="detail-stat-label">${amountLabel}</div>
                <div class="detail-stat-value" style="color: var(--primary-400)">${formatCurrency(customer.loanAmount)}</div>
            </div>
            ${hasInterest ? `
            <div class="detail-stat-card">
                <div class="detail-stat-label">${t('interestRate')}</div>
                <div class="detail-stat-value" style="color: var(--warning-400)">${customer.interestRate}%${t('monthlyInterest')}</div>
            </div>
            <div class="detail-stat-card">
                <div class="detail-stat-label">${t('totalRepayable')}</div>
                <div class="detail-stat-value" style="color: var(--warning-400)">${formatCurrency(totalRepayable)}</div>
            </div>
            <div class="detail-stat-card">
                <div class="detail-stat-label">${t('interestEarned')}</div>
                <div class="detail-stat-value" style="color: var(--warning-400)">${formatCurrency(interestAmt)}</div>
            </div>` : `
            <div class="detail-stat-card">
                <div class="detail-stat-label">${t('customerType')}</div>
                <div class="detail-stat-value" style="color: var(--text-primary)">${getCustomerTypeLabel(customer)}</div>
            </div>`}
            <div class="detail-stat-card">
                <div class="detail-stat-label">${t('issuedDate')}</div>
                <div class="detail-stat-value" style="color: var(--info-400)">${formatDate(customer.issuedDate)}</div>
            </div>
            <div class="detail-stat-card">
                <div class="detail-stat-label">${t('deadline')}</div>
                <div class="detail-stat-value" style="color: var(--warning-400)">${formatDate(customer.deadline)}</div>
            </div>
            <div class="detail-stat-card">
                <div class="detail-stat-label">${t('totalPaid')}</div>
                <div class="detail-stat-value" style="color: var(--success-400)">${formatCurrency(totalPaid)}</div>
            </div>
            <div class="detail-stat-card">
                <div class="detail-stat-label">${t('pending')}</div>
                <div class="detail-stat-value" style="color: var(--danger-400)">${formatCurrency(pending)}</div>
            </div>
        </div>
        <div class="progress-section" style="margin-bottom: 24px;">
            <div class="progress-header">
                <span class="progress-label">${t('overallProgress')}</span>
                <span class="progress-percent">${progress.toFixed(1)}%</span>
            </div>
            <div class="progress-bar" style="height: 8px;">
                <div class="progress-fill ${progress >= 100 ? 'complete' : ''}" style="width: ${progress}%"></div>
            </div>
        </div>
        <div class="detail-payments-title">${t('paymentHistory')} (${payments.length} ${t('entries')})</div>
        <div class="detail-payment-list">
            ${payments.length === 0 ? `<p style="color: var(--text-muted); text-align: center; padding: 20px;">${t('noPaymentsRecordedYet')}</p>` :
            `<table class="record-table">
                <thead>
                    <tr>
                        <th>${t('date')}</th>
                        <th>${t('amount')}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${payments.map(p => `
                        <tr>
                            <td>${formatDate(p.date)}</td>
                            <td style="color: var(--success-400); font-weight: 600">${formatCurrency(p.amount)}</td>
                            <td>
                                <div class="payment-actions">
                                    <button class="record-edit-btn" onclick="showReceipt('${p.id}', '${customerId}')" title="View Receipt">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                                    </button>
                                    <button class="record-edit-btn" onclick="editPayment('${p.id}', '${customerId}')" title="${t('editPayment')}">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                    </button>
                                    <button class="record-delete-btn" onclick="deletePayment('${p.id}', '${customerId}')" title="Delete payment">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>`}
        </div>`;

    modal.classList.add('active');
}

function closeDetailModal() {
    document.getElementById('detailModal').classList.remove('active');
}

async function deletePayment(paymentId, customerId) {
    if (!canPerform('DELETE_PAYMENT')) {
        showToast(typeof t === 'function' ? t('noPermission') || 'You do not have permission' : 'You do not have permission', 'error');
        return;
    }

    const confirmed = await showConfirm(typeof t === 'function' ? t('confirmDeletePayment') : 'Are you sure?');
    if (!confirmed) return;

    let payments = getPayments();
    const paymentToDelete = payments.find(p => p.id === paymentId);

    if (typeof appMode !== 'undefined' && appMode === 'org' && typeof dbDeletePayment === 'function') {
        await dbDeletePayment(paymentId);
    } else {
        payments = payments.filter(p => p.id !== paymentId);
        savePayments(payments);
    }

    showToast(typeof t === 'function' ? t('paymentDeleted') : 'Payment deleted', 'success', {
        label: typeof t === 'function' ? t('undo') : 'Undo',
        onClick: async () => {
            const undoConfirmed = await showConfirm(typeof t === 'function' ? t('confirmUndo') : 'Are you sure?');
            if (!undoConfirmed) return;

            if (typeof appMode !== 'undefined' && appMode === 'org' && typeof dbSavePayment === 'function') {
                await dbSavePayment(paymentToDelete);
            } else {
                let currentPayments = getPayments();
                currentPayments.push(paymentToDelete);
                savePayments(currentPayments);
            }

            showToast(typeof t === 'function' ? t('actionUndone') : 'Action undone');
            viewCustomerDetail(customerId);
            refreshCurrentView();
        }
    });
    viewCustomerDetail(customerId);
    refreshCurrentView();
}

// === Edit Payment ===
function editPayment(paymentId, customerId) {
    const payments = getPayments();
    const payment = payments.find(p => p.id === paymentId);
    if (!payment) return;

    const overlay = document.createElement('div');
    overlay.className = 'edit-payment-overlay';
    overlay.id = 'editPaymentOverlay';
    overlay.innerHTML = `
        <div class="edit-payment-dialog">
            <h4>${t('editPaymentTitle')}</h4>
            <div class="form-group">
                <label>${t('editAmount')}</label>
                <input type="number" id="editPaymentAmount" value="${payment.amount}" min="1" step="1">
            </div>
            <div class="form-group">
                <label>${t('editDate')}</label>
                <input type="date" id="editPaymentDate" value="${payment.date}">
            </div>
            <div class="edit-payment-actions">
                <button class="btn btn-secondary" onclick="closeEditPayment()">${t('btnCancel')}</button>
                <button class="btn btn-primary" onclick="savePaymentEdit('${paymentId}', '${customerId}')">${t('btnUpdate')}</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeEditPayment();
    });
}

function closeEditPayment() {
    const overlay = document.getElementById('editPaymentOverlay');
    if (overlay) overlay.remove();
}

async function savePaymentEdit(paymentId, customerId) {
    const newAmount = parseFloat(document.getElementById('editPaymentAmount').value);
    const newDate = document.getElementById('editPaymentDate').value;

    if (!newAmount || newAmount <= 0 || !newDate) return;

    let payments = getPayments();
    const index = payments.findIndex(p => p.id === paymentId);
    if (index !== -1) {
        payments[index].amount = newAmount;
        payments[index].date = newDate;
        if (typeof appMode !== 'undefined' && appMode === 'org' && typeof dbSavePayment === 'function') {
            await dbSavePayment(payments[index]);
        } else {
            savePayments(payments);
        }
        closeEditPayment();
        showToast(t('paymentUpdated'));
        viewCustomerDetail(customerId);
        refreshCurrentView();
    }
}

// === Loan Closing & Renewal ===
async function closeLoan(customerId) {
    if (!canPerform('CLOSE_LOAN')) {
        showToast(typeof t === 'function' ? t('noPermission') || 'You do not have permission' : 'You do not have permission', 'error');
        return;
    }

    const confirmed = await showConfirm(typeof t === 'function' ? t('confirmCloseLoan') : 'Are you sure?');
    if (!confirmed) return;

    const customers = getCustomers();
    const index = customers.findIndex(c => c.id === customerId);
    if (index !== -1) {
        if (needsApproval('CLOSE_LOAN')) {
            if (typeof submitForApproval === 'function') {
                submitForApproval('CLOSE_LOAN', { customerId: customerId });
                return;
            }
        }

        customers[index].status = 'closed';
        customers[index].closedDate = getTodayStr();
        if (typeof appMode !== 'undefined' && appMode === 'org' && typeof dbSaveCustomer === 'function') {
            await dbSaveCustomer(customers[index], true);
        } else {
            saveCustomers(customers);
        }
        showToast(t('loanClosed'));
        viewCustomerDetail(customerId);
        refreshCurrentView();
    }
}

async function renewLoan(customerId) {
    if (!canPerform('RENEW_LOAN')) {
        showToast(typeof t === 'function' ? t('noPermission') || 'You do not have permission' : 'You do not have permission', 'error');
        return;
    }

    const customers = getCustomers();
    const index = customers.findIndex(c => c.id === customerId);
    if (index !== -1) {
        const customer = customers[index];
        // Calculate duration BEFORE overwriting issuedDate
        const originalStart = new Date(customer.issuedDate);
        const originalEnd = new Date(customer.deadline);
        const durationDays = Math.round((originalEnd - originalStart) / (1000 * 60 * 60 * 24));
        
        // Reset to active with today's date
        customer.status = 'active';
        customer.issuedDate = getTodayStr();
        customer.closedDate = '';
        
        // Set deadline to same duration from today
        const newDeadline = new Date();
        newDeadline.setDate(newDeadline.getDate() + Math.max(durationDays, 30));
        customer.deadline = newDeadline.toISOString().split('T')[0];

        if (typeof appMode !== 'undefined' && appMode === 'org' && typeof dbSaveCustomer === 'function') {
            await dbSaveCustomer(customer);
        } else {
            saveCustomers(customers);
        }

        // Clear old payments for this customer
        let payments = getPayments();
        const paymentsToDelete = payments.filter(p => p.customerId === customerId);

        if (typeof appMode !== 'undefined' && appMode === 'org' && typeof dbDeletePayment === 'function') {
            for (const p of paymentsToDelete) {
                await dbDeletePayment(p.id);
            }
        } else {
            payments = payments.filter(p => p.customerId !== customerId);
            savePayments(payments);
        }

        showToast(t('loanRenewed'));
        viewCustomerDetail(customerId);
        refreshCurrentView();
    }
}

// === Daily Entry ===
// Track selected amounts per customer for the current session
let dailySelectedAmounts = {};
let dailyExpandedCustomerId = null;

function refreshDailyEntryView() {
    const customers = getCustomers();
    const date = document.getElementById('entryDate').value;
    const searchVal = document.getElementById('dailySearch').value.toLowerCase();
    const areaFilterVal = document.getElementById('areaFilter').value;
    const payments = getPayments();

    // Populate Area Filter dynamically
    const areas = [...new Set(customers.map(c => c.area).filter(a => a && a.trim() !== ''))];
    const areaSelect = document.getElementById('areaFilter');
    // Save current selection before repopulating
    const currentArea = areaSelect.value;
    areaSelect.innerHTML = `<option value="all" data-i18n="allAreas">${t('allAreas')}</option>` +
        areas.map(a => `<option value="${a}">${a}</option>`).join('');
    // Restore selection if it still exists
    if (currentArea === 'all' || areas.includes(currentArea)) {
        areaSelect.value = currentArea;
    }

    const typeFilterEl = document.getElementById('dailyTypeFilter');
    const typeFilterVal = typeFilterEl ? typeFilterEl.value : 'all';

    const filtered = customers.filter(c => {
        const cType = c.customerType || 'loan';
        return getCustomerStatus(c) !== 'closed' &&
            (areaFilterVal === 'all' || c.area === areaFilterVal) &&
            (typeFilterVal === 'all' || cType === typeFilterVal) &&
            (c.name.toLowerCase().includes(searchVal) || c.phone.includes(searchVal));
    });

    const container = document.getElementById('dailyEntryList');

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
                <p>${searchVal ? t('noCustomersFound') : t('noCustomersToShow')}</p>
                <span>${searchVal ? t('tryDifferentSearch') : t('addCustomersFirst')}</span>
            </div>`;
        return;
    }

    container.innerHTML = filtered.map((c, index) => {
        const todayPayments = payments.filter(p => p.customerId === c.id && p.date === date);
        const hasPaid = todayPayments.length > 0;
        const todayTotal = todayPayments.reduce((sum, p) => sum + p.amount, 0);
        const selectedAmount = dailySelectedAmounts[c.id] || null;
        const isExpanded = dailyExpandedCustomerId === c.id;
        const customerType = getCustomerType(c);
        const amountLabel = getCustomerAmountLabel(c);

        return `
            <div class="daily-entry-card ${hasPaid ? 'entered' : ''} ${isExpanded ? 'expanded' : ''}" id="entry-${c.id}">
                <div class="entry-card-top">
                    <div class="daily-entry-item-header">
                        <input type="checkbox" class="customer-checkbox" value="${c.id}" onchange="toggleBulkSelection(event)" ${hasPaid ? 'disabled' : ''}>
                        <div class="entry-customer-info" onclick="toggleDailyEntry('${c.id}')" style="cursor: pointer;">
                            ${getAvatarHtml(c, 'customer-avatar')}
                            <div class="entry-customer-details">
                                <h4>${index + 1}. ${getDisplayName(c)}</h4>
                                <span>${c.phone} - ${amountLabel}: ${formatCurrency(c.loanAmount)}</span>
                                <span class="customer-type-badge ${customerType}">${getCustomerTypeLabel(c)}</span>
                            </div>
                        </div>
                    </div>
                    <div class="entry-card-actions" onclick="toggleDailyEntry('${c.id}')" style="cursor: pointer;">
                        <span class="entry-status ${hasPaid ? 'done' : 'pending'}">
                            ${hasPaid ? `${t('paid')} ${formatCurrency(todayTotal)}` : t('pendingStatus')}
                        </span>
                        <span class="entry-expand-toggle ${isExpanded ? 'open' : ''}">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </span>
                    </div>
                </div>
                <div class="entry-card-body ${isExpanded ? 'open' : ''}">
                <div class="amount-options">
                    ${AMOUNT_OPTIONS.map(amt => `
                        <button type="button" class="amount-chip ${selectedAmount === amt ? 'selected' : ''}"
                            onclick="selectAmount('${c.id}', ${amt})">${formatCurrency(amt)}</button>
                    `).join('')}
                </div>
                <div class="entry-footer">
                    <div class="manual-amount-input">
                        <span>₹</span>
                        <input type="number" id="manual-${c.id}" placeholder="${t('orEnterManually')}"
                            min="1" oninput="clearChipSelection('${c.id}')">
                    </div>
                    <button class="btn btn-success btn-sm" onclick="submitDailyEntry('${c.id}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                        ${t('save')}
                    </button>
                </div>
                </div>
            </div>`;
    }).join('');
}

function loadDailyEntryView() {
    dailySelectedAmounts = {};
    dailyExpandedCustomerId = null;
    refreshDailyEntryView();
}

function filterDailyEntry() {
    refreshDailyEntryView();
}

function toggleDailyEntry(customerId) {
    dailyExpandedCustomerId = dailyExpandedCustomerId === customerId ? null : customerId;
    refreshDailyEntryView();
}

function selectAmount(customerId, amount) {
    if (dailySelectedAmounts[customerId] === amount) {
        delete dailySelectedAmounts[customerId];
    } else {
        dailySelectedAmounts[customerId] = amount;
    }
    // Clear manual input
    const manualInput = document.getElementById(`manual-${customerId}`);
    if (manualInput) manualInput.value = '';
    refreshDailyEntryView();
}

function clearChipSelection(customerId) {
    delete dailySelectedAmounts[customerId];
    // Remove selected state from chips
    const card = document.getElementById(`entry-${customerId}`);
    if (card) {
        card.querySelectorAll('.amount-chip').forEach(chip => chip.classList.remove('selected'));
    }
}

async function submitDailyEntry(customerId) {
    const date = document.getElementById('entryDate').value;
    if (!date) {
        showToast(t('selectDateFirst'), 'error');
        return;
    }

    let amount = dailySelectedAmounts[customerId] || null;
    const manualInput = document.getElementById(`manual-${customerId}`);
    if (manualInput && manualInput.value) {
        amount = parseFloat(manualInput.value);
    }

    if (!amount || amount <= 0) {
        showToast(t('selectOrEnterAmount'), 'error');
        return;
    }

    const newPaymentId = generateId();
    const payments = getPayments();
    const paymentObj = {
        id: newPaymentId,
        customerId,
        date,
        amount,
        timestamp: Date.now()
    };

    if (!canPerform('ADD_PAYMENT')) {
        showToast(typeof t === 'function' ? t('noPermission') || 'You do not have permission' : 'You do not have permission', 'error');
        return;
    }

    if (typeof appMode !== 'undefined' && appMode === 'org' && typeof currentUser !== 'undefined' && currentUser) {
        paymentObj.collectedBy = currentUser.uid;
        paymentObj.collectedByName = currentUser.displayName || currentUser.email;
    }

    if (typeof appMode !== 'undefined' && appMode === 'org' && typeof dbSavePayment === 'function') {
        await dbSavePayment(paymentObj);
    } else {
        payments.push(paymentObj);
        savePayments(payments);
    }

    delete dailySelectedAmounts[customerId];
    dailyExpandedCustomerId = null;
    if (manualInput) manualInput.value = '';

    const customer = getCustomers().find(c => c.id === customerId);
    showToast(`${formatCurrency(amount)} ${t('amountRecorded')} ${customer ? getDisplayName(customer) : t('customer')}!`, 'success', {
        label: t('undo'),
        onClick: async () => {
            const undoConfirmed = await showConfirm(t('confirmUndo'));
            if (!undoConfirmed) return;

            if (typeof appMode !== 'undefined' && appMode === 'org' && typeof dbDeletePayment === 'function') {
                await dbDeletePayment(newPaymentId, true);
            } else {
                let currentPayments = getPayments();
                currentPayments = currentPayments.filter(p => p.id !== newPaymentId);
                savePayments(currentPayments);
            }

            showToast(t('actionUndone'));
            refreshCurrentView();
        }
    });
    refreshCurrentView();

    // Check if loan is fully paid and prompt to close
    if (customer && customer.status !== 'closed' && getCustomerType(customer) !== 'saving') {
        const customerPayments = getPayments().filter(p => p.customerId === customerId);
        const totalPaid = customerPayments.reduce((sum, p) => sum + p.amount, 0);
        const totalRepayable = calculateTotalRepayable(customer);
        
        if (totalPaid >= totalRepayable) {
            setTimeout(async () => {
                const closeConfirmed = await showConfirm(`This payment fully clears the loan balance for ${getDisplayName(customer)}! Would you like to mark this loan as Closed?`);
                if (closeConfirmed) {
                    if (typeof appMode !== 'undefined' && appMode === 'org' && typeof dbSaveCustomer === 'function') {
                        customer.status = 'closed';
                        await dbSaveCustomer(customer);
                    } else {
                        const customers = getCustomers();
                        const idx = customers.findIndex(c => c.id === customer.id);
                        if (idx !== -1) {
                            customers[idx].status = 'closed';
                            saveCustomers(customers);
                        }
                    }
                    showToast('Loan marked as closed!', 'success');
                    refreshCurrentView();
                }
            }, 600); // Small delay to let the toast settle
        }
    }
}

// === Bulk Collection ===
function toggleBulkSelection(event) {
    event.stopPropagation();
    updateBulkActionBar();
}

function updateBulkActionBar() {
    const selectedCount = document.querySelectorAll('.customer-checkbox:checked').length;
    const actionBar = document.getElementById('bulkActionBar');
    const countText = document.getElementById('bulkSelectedCount');

    if (selectedCount > 0) {
        actionBar.style.display = 'flex';
        countText.textContent = `${selectedCount} ${t('selectedCustomers')}`;
    } else {
        actionBar.style.display = 'none';
    }
}

function openBulkCollectModal() {
    document.getElementById('bulkCollectModal').classList.add('active');
    document.getElementById('bulkCollectAmount').value = '';
    document.getElementById('bulkCollectAmount').focus();
}

function closeBulkCollectModal() {
    document.getElementById('bulkCollectModal').classList.remove('active');
}

async function processBulkCollect() {
    const amount = parseFloat(document.getElementById('bulkCollectAmount').value);
    const date = document.getElementById('entryDate').value;

    if (!amount || amount <= 0) {
        showToast(t('selectOrEnterAmount'), 'error');
        return;
    }

    if (!date) {
        showToast(t('selectDateFirst'), 'error');
        return;
    }

    const selectedCheckboxes = document.querySelectorAll('.customer-checkbox:checked');
    const payments = getPayments();
    const newPaymentIds = [];

    if (!canPerform('ADD_PAYMENT')) {
        showToast(typeof t === 'function' ? t('noPermission') || 'You do not have permission' : 'You do not have permission', 'error');
        return;
    }

    for (const cb of selectedCheckboxes) {
        const newId = generateId();
        newPaymentIds.push(newId);

        const paymentObj = {
            id: newId,
            customerId: cb.value,
            date: date,
            amount: amount,
            timestamp: Date.now()
        };

        if (typeof appMode !== 'undefined' && appMode === 'org' && typeof currentUser !== 'undefined' && currentUser) {
            paymentObj.collectedBy = currentUser.uid;
            paymentObj.collectedByName = currentUser.displayName || currentUser.email;
        }

        if (typeof appMode !== 'undefined' && appMode === 'org' && typeof dbSavePayment === 'function') {
            await dbSavePayment(paymentObj);
        } else {
            payments.push(paymentObj);
        }
    }

    if (typeof appMode === 'undefined' || appMode !== 'org') {
        savePayments(payments);
    }

    closeBulkCollectModal();
    showToast(`${formatCurrency(amount)} ${t('amountRecorded')} for ${selectedCheckboxes.length} ${t('customer')}s!`, 'success', {
        label: t('undo'),
        onClick: async () => {
            const undoConfirmed = await showConfirm(t('confirmUndo'));
            if (!undoConfirmed) return;

            if (typeof appMode !== 'undefined' && appMode === 'org' && typeof dbDeletePayment === 'function') {
                for (const id of newPaymentIds) {
                    await dbDeletePayment(id, true);
                }
            } else {
                let currentPayments = getPayments();
                currentPayments = currentPayments.filter(p => !newPaymentIds.includes(p.id));
                savePayments(currentPayments);
            }

            showToast(t('actionUndone'));
            refreshCurrentView();
        }
    });
    refreshCurrentView();
    updateBulkActionBar(); // Will hide it since checkboxes will be unmounted
}

// === Reminders ===
function sendReminder(phone, amountStr, nameStr) {
    // Basic sanitization
    const cleanPhone = phone.replace(/\D/g, '');
    const message = t('reminderMessage')
        .replace('{name}', nameStr)
        .replace('{amount}', amountStr);

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    window.open(url, '_blank');
}

// === Records ===
function refreshRecordsList() {
    window.customerDateFilters = window.customerDateFilters || {};
    const customers = getCustomers();
    const searchVal = document.getElementById('recordsSearch').value.toLowerCase();
    const globalDateInput = document.getElementById('recordFilterDate');
    const globalDateVal = globalDateInput ? globalDateInput.value : '';

    let filtered = customers.filter(c =>
        c.name.toLowerCase().includes(searchVal) ||
        c.phone.includes(searchVal)
    );

    if (globalDateVal) {
        filtered = filtered.filter(c => {
            const payments = getCustomerPayments(c.id);
            return payments.some(p => p.date === globalDateVal);
        });
    }

    const container = document.getElementById('recordsList');

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                <p>${searchVal ? t('noCustomersFound') : t('noRecords')}</p>
                <span>${searchVal ? t('tryDifferentSearch') : t('recordsWillAppear')}</span>
            </div>`;
        return;
    }

    container.innerHTML = filtered.map((c, index) => {
        const payments = getCustomerPayments(c.id);
        const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
        const totalRepayable = calculateTotalRepayable(c);
        const pending = Math.max(0, totalRepayable - totalPaid);
        const progress = totalRepayable > 0 ? Math.min(100, (totalPaid / totalRepayable) * 100) : 0;
        const customerType = getCustomerType(c);
        const amountLabel = getCustomerAmountLabel(c);

        return `
            <div class="record-card" id="record-${c.id}">
                <div class="record-card-header" onclick="toggleRecord('${c.id}')">
                    <div class="record-summary">
                        ${getAvatarHtml(c, 'customer-avatar')}
                        <div>
                            <div class="customer-name">${index + 1}. ${getDisplayName(c)}</div>
                            <div class="customer-phone">${c.phone}</div>
                            <span class="customer-type-badge ${customerType}">${getCustomerTypeLabel(c)}</span>
                        </div>
                    </div>
                    <div class="record-summary-stats">
                        <div class="record-stat">
                            <span class="record-stat-label">${amountLabel}</span>
                            <span class="record-stat-value" style="color: var(--primary-400)">${formatCurrency(c.loanAmount)}</span>
                        </div>
                        <div class="record-stat">
                            <span class="record-stat-label">${t('paid')}</span>
                            <span class="record-stat-value" style="color: var(--success-400)">${formatCurrency(totalPaid)}</span>
                        </div>
                        <div class="record-stat">
                            <span class="record-stat-label">${t('pending')}</span>
                            <span class="record-stat-value" style="color: var(--danger-400)">${formatCurrency(pending)}</span>
                        </div>
                        <div class="record-stat">
                            <span class="record-stat-label">${t('progress')}</span>
                            <span class="record-stat-value">${progress.toFixed(1)}%</span>
                        </div>
                    </div>
                    <div class="record-toggle" id="toggle-${c.id}">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                </div>
                <div class="record-card-body" id="body-${c.id}">
                    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; padding: 12px 20px 0 20px; align-items: center;">
                        <input type="date" id="filter-start-${c.id}" class="settings-input" style="padding:6px; flex:1;" value="${window.customerDateFilters[c.id]?.start || ''}" placeholder="Start Date">
                        <input type="date" id="filter-end-${c.id}" class="settings-input" style="padding:6px; flex:1;" value="${window.customerDateFilters[c.id]?.end || ''}" placeholder="End Date">
                        <button class="btn btn-primary" style="padding:6px 12px;" onclick="event.stopPropagation(); applyCustomerDateFilter('${c.id}')">Filter</button>
                        ${window.customerDateFilters[c.id] ? `<button class="btn btn-secondary" style="padding:6px 12px;" onclick="event.stopPropagation(); clearCustomerDateFilter('${c.id}')">Clear</button>` : ''}
                    </div>
                    ${payments.length === 0 ? `<p style="color: var(--text-muted); text-align: center; padding: 20px;">${t('noPaymentsRecorded')}</p>` :
                `<table class="record-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>${t('date')}</th>
                                <th>${t('amount')}</th>
                                <th>${t('runningTotal')}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            ${(() => {
                    let runningTotal = 0;
                    // Show in chronological order for the table
                    let chronological = [...payments].reverse();

                    // Filter logic
                    const filter = window.customerDateFilters[c.id];
                    if (globalDateVal) {
                        chronological = chronological.filter(p => p.date === globalDateVal);
                    } else if (filter) {
                        if (filter.start) chronological = chronological.filter(p => p.date >= filter.start);
                        if (filter.end) chronological = chronological.filter(p => p.date <= filter.end);
                    }

                    if (chronological.length === 0) {
                        return `<tr><td colspan="5" style="text-align:center; padding: 20px;">No payments found for selected dates</td></tr>`;
                    }

                    return chronological.map((p, i) => {
                        runningTotal += p.amount;
                        return `
                                        <tr>
                                            <td style="color: var(--text-muted)">${i + 1}</td>
                                            <td>${formatDate(p.date)}</td>
                                            <td style="color: var(--success-400); font-weight: 600">${formatCurrency(p.amount)}</td>
                                            <td style="font-weight: 600">${formatCurrency(runningTotal)}</td>
                                            <td>
                                                <button class="record-delete-btn" onclick="event.stopPropagation(); deletePaymentFromRecords('${p.id}', '${c.id}')" title="Delete">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                                </button>
                                            </td>
                                        </tr>`;
                    }).join('');
                })()}
                        </tbody>
                    </table>`}
                </div>
            </div>`;
    }).join('');
}

function toggleRecord(customerId) {
    const body = document.getElementById(`body-${customerId}`);
    const toggle = document.getElementById(`toggle-${customerId}`);
    body.classList.toggle('open');
    toggle.classList.toggle('open');
}

function filterRecords() {
    refreshRecordsList();
}

function applyCustomerDateFilter(customerId) {
    const start = document.getElementById(`filter-start-${customerId}`).value;
    const end = document.getElementById(`filter-end-${customerId}`).value;

    if (!start && !end) return;

    window.customerDateFilters = window.customerDateFilters || {};
    window.customerDateFilters[customerId] = { start, end };
    refreshRecordsList();

    // Ensure the accordion stays open after refresh
    setTimeout(() => {
        const body = document.getElementById(`body-${customerId}`);
        const toggle = document.getElementById(`toggle-${customerId}`);
        if (body && toggle) {
            body.classList.add('open');
            toggle.classList.add('open');
        }
    }, 50);
}

function clearCustomerDateFilter(customerId) {
    if (window.customerDateFilters && window.customerDateFilters[customerId]) {
        delete window.customerDateFilters[customerId];
    }
    refreshRecordsList();

    // Ensure the accordion stays open after refresh
    setTimeout(() => {
        const body = document.getElementById(`body-${customerId}`);
        const toggle = document.getElementById(`toggle-${customerId}`);
        if (body && toggle) {
            body.classList.add('open');
            toggle.classList.add('open');
        }
    }, 50);
}

async function deletePaymentFromRecords(paymentId, customerId) {
    if (!canPerform('DELETE_PAYMENT')) {
        showToast(typeof t === 'function' ? t('noPermission') || 'You do not have permission' : 'You do not have permission', 'error');
        return;
    }

    const confirmed = await showConfirm(typeof t === 'function' ? t('confirmDeletePayment') : 'Are you sure?');
    if (!confirmed) return;

    let payments = getPayments();
    const paymentToDelete = payments.find(p => p.id === paymentId);

    if (typeof appMode !== 'undefined' && appMode === 'org' && typeof dbDeletePayment === 'function') {
        dbDeletePayment(paymentId);
    } else {
        payments = payments.filter(p => p.id !== paymentId);
        savePayments(payments);
    }

    showToast(typeof t === 'function' ? t('paymentDeleted') : 'Payment deleted', 'success', {
        label: typeof t === 'function' ? t('undo') : 'Undo',
        onClick: async () => {
            const undoConfirmed = await showConfirm(typeof t === 'function' ? t('confirmUndo') : 'Are you sure?');
            if (!undoConfirmed) return;

            if (typeof appMode !== 'undefined' && appMode === 'org' && typeof dbSavePayment === 'function') {
                dbSavePayment(paymentToDelete);
            } else {
                let currentPayments = getPayments();
                currentPayments.push(paymentToDelete);
                savePayments(currentPayments);
            }

            showToast(typeof t === 'function' ? t('actionUndone') : 'Action undone');
            refreshCurrentView();
        }
    });
    refreshCurrentView();
}

// === Reports & Analytics ===
let collectionChartInstance = null;

function refreshReportsView() {
    let customers = getCustomers();
    let payments = getPayments();

    // Populate Agent Filter Dropdown (if in Org Mode and is Admin/Manager)
    const filterGroup = document.getElementById('reportAgentFilterGroup');
    const filterSelect = document.getElementById('reportAgentFilter');
    if (canPerform('FILTER_BY_AGENT')) {
        filterGroup.style.display = 'block';
        // Only populate if not already populated with current members
        if (typeof _orgMembersCache !== 'undefined' && filterSelect.options.length <= 1) {
            let selectableMembers = _orgMembersCache;
            if (currentOrgMemberRole === 'manager') {
                selectableMembers = _orgMembersCache.filter(m => m.role === 'agent' || m.role === 'collector' || m.role === 'viewer' || m.uid === currentUser?.uid);
            }
            filterSelect.innerHTML = '<option value="all">All Agents</option>' + selectableMembers.map(member =>
                `<option value="${member.uid}">${member.displayName || member.email} (${member.role})</option>`
            ).join('');
        }

        // Apply filtering
        const selectedAgent = filterSelect.value;
        if (selectedAgent && selectedAgent !== 'all') {
            customers = customers.filter(c => c.assignedAgent === selectedAgent);
            payments = payments.filter(p => p.collectedBy === selectedAgent);
        }
    } else {
        filterGroup.style.display = 'none';
    }

    // Summary Cards
    const now = new Date();
    const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];

    const thisMonthPayments = payments.filter(p => p.date >= firstDayThisMonth);
    const thisMonthCollected = thisMonthPayments.reduce((sum, p) => sum + p.amount, 0);

    const activeLoansCount = customers.filter(c => getCustomerStatus(c) !== 'closed' && getCustomerType(c) === 'loan').length;

    document.getElementById('reportMonthlyCollected').textContent = formatCurrency(thisMonthCollected);
    document.getElementById('reportActiveLoans').textContent = activeLoansCount;

    // Defaulters Logic (> 3 days overdue)
    const DEFAULTER_THRESHOLD_DAYS = 3;
    const defaulters = [];

    customers.filter(c => getCustomerStatus(c) !== 'closed' && getCustomerType(c) === 'loan').forEach(c => {
        const customerPayments = getCustomerPayments(c.id);
        const totalPaid = customerPayments.reduce((sum, p) => sum + p.amount, 0);
        const totalRepayable = calculateTotalRepayable(c);

        // Only consider if they still owe money
        if (totalPaid < totalRepayable) {
            let lastPaymentDate = c.issuedDate;
            if (customerPayments.length > 0) {
                lastPaymentDate = customerPayments[0].date; // Assuming sorted latest first
            }

            const daysSinceLastPayment = daysUntil(lastPaymentDate) * -1; // daysUntil returns negative for past dates

            if (daysSinceLastPayment > DEFAULTER_THRESHOLD_DAYS) {
                defaulters.push({
                    customer: c,
                    daysOverdue: daysSinceLastPayment,
                    pendingAmount: totalRepayable - totalPaid
                });
            }
        }
    });

    // Sort defaulters by days overdue descending
    defaulters.sort((a, b) => b.daysOverdue - a.daysOverdue);

    document.getElementById('reportDefaultersCount').textContent = defaulters.length;

    const defaultersListEl = document.getElementById('defaultersList');
    if (defaulters.length === 0) {
        defaultersListEl.innerHTML = `
            <div class="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <p>${t('noDefaulters')}</p>
                <span>${t('allCustomersPaying')}</span>
            </div>
        `;
    } else {
        defaultersListEl.innerHTML = defaulters.map(d => `
            <div class="defaulter-item" onclick="viewCustomerDetail('${d.customer.id}')" style="cursor: pointer;">
                <div class="defaulter-info">
                    ${getAvatarHtml(d.customer, 'defaulter-avatar')}
                    <div class="defaulter-details">
                        <h4>${getDisplayName(d.customer)}</h4>
                        <p>${d.customer.phone} · ${t('pending')}: ${formatCurrency(d.pendingAmount)}</p>
                        <button class="btn-whatsapp" onclick="event.stopPropagation(); sendReminder('${d.customer.phone}', '${formatCurrency(d.pendingAmount)}', '${getDisplayName(d.customer)}')" style="margin-top: 8px;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                            ${t('btnSendReminder')}
                        </button>
                    </div>
                </div>
                <div class="defaulter-status">
                    <div class="days">${d.daysOverdue}</div>
                    <div class="label">${t('daysOverdue')}</div>
                </div>
            </div>
        `).join('');
    }

    // Chart Logic (Last 30 Days)
    const chartLabels = [];
    const chartData = [];

    // Generate last 30 days
    for (let i = 29; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];

        // Format for display (e.g. "Jun 28")
        const displayLabel = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        chartLabels.push(displayLabel);

        const dayTotal = payments
            .filter(p => p.date === dateStr)
            .reduce((sum, p) => sum + p.amount, 0);

        chartData.push(dayTotal);
    }

    const ctx = document.getElementById('collectionChart');
    if (!ctx) return;

    // Destroy previous instance to prevent overlapping
    if (collectionChartInstance) {
        collectionChartInstance.destroy();
    }

    // Wait for next frame to render chart (ensures canvas is visible)
    setTimeout(() => {
        if (!window.Chart) return;

        // CSS variables for themes
        const rootStyles = getComputedStyle(document.documentElement);
        const primaryColor = rootStyles.getPropertyValue('--primary-500').trim() || '#6366f1';
        const primaryGlow = rootStyles.getPropertyValue('--primary-400').trim() || '#818cf8';
        const gridColor = rootStyles.getPropertyValue('--border-color').trim() || '#1e293b';
        const textColor = rootStyles.getPropertyValue('--text-secondary').trim() || '#94a3b8';

        collectionChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: [{
                    label: 'Daily Collection',
                    data: chartData,
                    borderColor: primaryColor,
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    borderWidth: 2,
                    pointBackgroundColor: primaryGlow,
                    pointBorderColor: '#0f172a',
                    pointBorderWidth: 2,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: '#1e293b',
                        titleColor: '#f8fafc',
                        bodyColor: '#cbd5e1',
                        borderColor: '#334155',
                        borderWidth: 1,
                        padding: 10,
                        displayColors: false,
                        callbacks: {
                            label: function (context) {
                                return '₹' + context.parsed.y.toLocaleString(getCurrentLocale());
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: gridColor,
                            drawBorder: false,
                        },
                        ticks: {
                            color: textColor,
                            maxTicksLimit: 10
                        }
                    },
                    y: {
                        grid: {
                            color: gridColor,
                            drawBorder: false,
                        },
                        ticks: {
                            color: textColor,
                            callback: function (value) {
                                if (value >= 1000) {
                                    return '₹' + (value / 1000).toFixed(1) + 'k';
                                }
                                return '₹' + value;
                            }
                        },
                        beginAtZero: true
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                }
            }
        });
    }, 100);
}

// === Refresh ===
function refreshCurrentView() {
    refreshDashboard();
    switch (currentView) {
        case 'customers':
            refreshCustomersList();
            break;
        case 'daily-entry':
            refreshDailyEntryView();
            break;
        case 'records':
            refreshRecordsList();
            break;
        case 'reports':
            refreshReportsView();
            break;
        case 'settings':
            renderSettingsView();
            break;
    }
}

// ========================================
// SETTINGS SYSTEM
// ========================================

function getSettings() {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : {
        businessName: '',
        ownerName: '',
        defaultAmount: 100,
        pinEnabled: false,
        pinHash: '',
        autoCloudSync: false
    };
}

function saveSettings(settings) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

// Sidebar business name update removed as sidebar is deleted

// ========================================
// PIN LOCK SYSTEM
// ========================================

let lockPinBuffer = '';
let setupPinBuffer = '';
let setupPinStep = 'new'; // 'current', 'new', 'confirm'
let setupPinFirstEntry = '';
let setupPinIsChange = false;
let isBiometricAvailable = false;

async function hashPin(pin) {
    const encoder = new TextEncoder();
    const data = encoder.encode(pin + '_pigmie_salt');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function updateLockDots(prefix, buffer) {
    for (let i = 0; i < 4; i++) {
        const dot = document.getElementById(`${prefix}${i}`);
        if (dot) {
            dot.classList.toggle('filled', i < buffer.length);
            dot.classList.remove('error');
        }
    }
}

function setDotsError(prefix) {
    for (let i = 0; i < 4; i++) {
        const dot = document.getElementById(`${prefix}${i}`);
        if (dot) {
            dot.classList.add('error');
            dot.classList.remove('filled');
        }
    }
}

// --- Lock Screen ---
function showLockScreen() {
    const lockScreen = document.getElementById('lockScreen');
    lockScreen.classList.add('active');
    lockPinBuffer = '';
    updateLockDots('pinDot', '');
    document.getElementById('pinError').textContent = '';

    const settings = getSettings();
    if (settings.biometricEnabled && isBiometricAvailable) {
        document.getElementById('biometricBtn').style.display = 'block';
        document.getElementById('emptyBiometricKey').style.display = 'none';
    } else {
        document.getElementById('biometricBtn').style.display = 'none';
        document.getElementById('emptyBiometricKey').style.display = 'block';
    }
}

async function triggerBiometricAuth() {
    if (!isBiometricAvailable) return;
    try {
        await window.Capacitor.Plugins.NativeBiometric.verifyIdentity({
            reason: "Unlock Pigmie Record Manager",
            title: "Log In",
            subtitle: "Verify your identity to open the app",
            description: "Use your fingerprint or face to authenticate"
        });
        // Success
        hideLockScreen();
    } catch (e) {
        // Failed or cancelled - do nothing, let them use PIN
        console.log("Biometric auth failed or cancelled", e);
    }
}

function hideLockScreen() {
    const lockScreen = document.getElementById('lockScreen');
    lockScreen.classList.remove('active');
    lockPinBuffer = '';
}

function pinKeyPress(digit) {
    if (lockPinBuffer.length >= 4) return;
    lockPinBuffer += digit;
    updateLockDots('pinDot', lockPinBuffer);

    if (lockPinBuffer.length === 4) {
        verifyLockPin();
    }
}

function pinKeyDelete() {
    if (lockPinBuffer.length > 0) {
        lockPinBuffer = lockPinBuffer.slice(0, -1);
        updateLockDots('pinDot', lockPinBuffer);
        document.getElementById('pinError').textContent = '';
    }
}

async function verifyLockPin() {
    const settings = getSettings();
    const hash = await hashPin(lockPinBuffer);

    if (hash === settings.pinHash) {
        hideLockScreen();
    } else {
        document.getElementById('pinError').textContent = t('wrongPin');
        setDotsError('pinDot');
        const display = document.querySelector('#lockScreen .pin-display');
        display.classList.add('shake');
        setTimeout(() => {
            display.classList.remove('shake');
            lockPinBuffer = '';
            updateLockDots('pinDot', '');
        }, 600);
    }
}

// --- PIN Setup Modal ---
function openPinModal(isChange = false) {
    setupPinIsChange = isChange;
    setupPinBuffer = '';
    setupPinFirstEntry = '';
    setupPinStep = isChange ? 'current' : 'new';

    const modal = document.getElementById('pinModal');
    const title = document.getElementById('pinModalTitle');
    const label = document.getElementById('pinSetupLabel');

    title.textContent = t(isChange ? 'changePinTitle' : 'setPinTitle');
    label.textContent = t(isChange ? 'enterCurrentPin' : 'enterNewPin');

    document.getElementById('pinSetupError').textContent = '';
    updateLockDots('setupPinDot', '');
    modal.classList.add('active');
}

function closePinModal() {
    document.getElementById('pinModal').classList.remove('active');
    setupPinBuffer = '';
    setupPinFirstEntry = '';
}

function setupPinKeyPress(digit) {
    if (setupPinBuffer.length >= 4) return;
    setupPinBuffer += digit;
    updateLockDots('setupPinDot', setupPinBuffer);

    if (setupPinBuffer.length === 4) {
        handleSetupPinComplete();
    }
}

function setupPinKeyDelete() {
    if (setupPinBuffer.length > 0) {
        setupPinBuffer = setupPinBuffer.slice(0, -1);
        updateLockDots('setupPinDot', setupPinBuffer);
        document.getElementById('pinSetupError').textContent = '';
    }
}

async function handleSetupPinComplete() {
    const label = document.getElementById('pinSetupLabel');
    const errorEl = document.getElementById('pinSetupError');

    if (setupPinStep === 'current') {
        // Verify current PIN first
        const settings = getSettings();
        const hash = await hashPin(setupPinBuffer);
        if (hash !== settings.pinHash) {
            errorEl.textContent = t('wrongCurrentPin');
            setDotsError('setupPinDot');
            const display = document.querySelector('#pinModal .pin-display');
            display.classList.add('shake');
            setTimeout(() => {
                display.classList.remove('shake');
                setupPinBuffer = '';
                updateLockDots('setupPinDot', '');
            }, 600);
            return;
        }
        // Move to enter new PIN
        setupPinStep = 'new';
        setupPinBuffer = '';
        errorEl.textContent = '';
        label.textContent = t('enterNewPin');
        updateLockDots('setupPinDot', '');
    } else if (setupPinStep === 'new') {
        // Store first entry, ask for confirmation
        setupPinFirstEntry = setupPinBuffer;
        setupPinStep = 'confirm';
        setupPinBuffer = '';
        errorEl.textContent = '';
        label.textContent = t('confirmNewPin');
        updateLockDots('setupPinDot', '');
    } else if (setupPinStep === 'confirm') {
        // Check if matches
        if (setupPinBuffer === setupPinFirstEntry) {
            const hash = await hashPin(setupPinBuffer);
            const settings = getSettings();
            settings.pinHash = hash;
            settings.pinEnabled = true;
            saveSettings(settings);
            closePinModal();
            showToast(t(setupPinIsChange ? 'pinChanged' : 'pinSet'));
            renderSettingsView();
        } else {
            errorEl.textContent = t('pinMismatch');
            setDotsError('setupPinDot');
            const display = document.querySelector('#pinModal .pin-display');
            display.classList.add('shake');
            setTimeout(() => {
                display.classList.remove('shake');
                setupPinStep = 'new';
                setupPinBuffer = '';
                setupPinFirstEntry = '';
                label.textContent = t('enterNewPin');
                errorEl.textContent = '';
                updateLockDots('setupPinDot', '');
            }, 600);
        }
    }
}

function togglePinEnabled() {
    const settings = getSettings();
    if (!settings.pinEnabled) {
        // Enable: open modal to set PIN
        openPinModal(false);
    } else {
        // Disable: remove PIN
        settings.pinEnabled = false;
        settings.pinHash = '';
        saveSettings(settings);
        showToast(t('pinRemoved'));
        renderSettingsView();
    }
}

function toggleBiometricEnabled() {
    const settings = getSettings();
    settings.biometricEnabled = !settings.biometricEnabled;
    saveSettings(settings);
    showToast(settings.biometricEnabled ? 'Biometric enabled!' : 'Biometric disabled!');
    renderSettingsView();
}

// ========================================
// BACKUP & RESTORE
// ========================================

/**
 * Helper to download or share files natively in Capacitor Android or Web
 */
async function shareOrDownloadFile(filename, content, mimeType, isBase64 = false) {
    if (isNativePlatform()) {
        try {
            const { Filesystem, Share } = window.Capacitor.Plugins;
            const options = {
                path: filename,
                data: content,
                directory: 'CACHE',
            };

            // If not base64, we specify utf8 encoding
            if (!isBase64) {
                options.encoding = 'utf8';
            }

            const writeResult = await Filesystem.writeFile(options);

            await Share.share({
                title: 'Export Data',
                url: writeResult.uri,
                dialogTitle: 'Share ' + filename,
            });
        } catch (e) {
            showToast('Native share failed: ' + e.message, 'error');
            console.error(e);
        }
    } else {
        // Fallback for Web browser
        let blob;
        if (isBase64) {
            const byteCharacters = atob(content);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            blob = new Blob([byteArray], { type: mimeType });
        } else {
            blob = new Blob([content], { type: mimeType });
        }

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

function exportBackup() {
    try {
        const backup = {
            version: '1.0.0',
            exportDate: new Date().toISOString(),
            customers: getCustomers(),
            payments: getPayments(),
            settings: getSettings()
        };

        const jsonStr = JSON.stringify(backup, null, 2);
        const dateStr = getTodayStr();
        const filename = `pigmie_backup_${dateStr}.json`;

        shareOrDownloadFile(filename, jsonStr, 'application/json', false).then(() => {
            showToast(t('backupExported'));
        });
    } catch (e) {
        showToast('Export failed: ' + e.message, 'error');
    }
}

function exportToCSV(type) {
    try {
        let csvContent = "";
        let filename = "";
        const dateStr = getTodayStr();

        if (type === 'customers') {
            let customers = getCustomers();
            let payments = getPayments();

            if (typeof appMode !== 'undefined' && appMode === 'org' && document.getElementById('reportAgentFilterGroup').style.display !== 'none') {
                const selectedAgent = document.getElementById('reportAgentFilter').value;
                if (selectedAgent && selectedAgent !== 'all') {
                    customers = customers.filter(c => c.assignedAgent === selectedAgent);
                    payments = payments.filter(p => p.collectedBy === selectedAgent);
                }
            }

            // CSV Header
            csvContent += "ID,Name,Phone,Area,Type,Loan Amount,Interest Rate,Issued Date,Deadline,Status,Total Paid,Pending Balance\n";

            customers.forEach(c => {
                const cPayments = payments.filter(p => p.customerId === c.id);
                const totalPaid = cPayments.reduce((sum, p) => sum + p.amount, 0);
                const totalRepayable = calculateTotalRepayable(c);
                const pending = Math.max(0, totalRepayable - totalPaid);
                const status = (pending <= 0) ? "Closed" : "Active";

                const row = [
                    c.id,
                    `"${getDisplayName(c)}"`,
                    c.phone,
                    `"${c.area || ''}"`,
                    c.customerType || 'loan',
                    c.loanAmount,
                    c.interestRate || 0,
                    c.issuedDate,
                    c.deadline,
                    status,
                    totalPaid,
                    pending
                ];
                csvContent += row.join(",") + "\n";
            });
            filename = `pigmie_customers_${dateStr}.csv`;

        } else if (type === 'payments') {
            let payments = getPayments();
            let customers = getCustomers();

            if (typeof appMode !== 'undefined' && appMode === 'org' && document.getElementById('reportAgentFilterGroup').style.display !== 'none') {
                const selectedAgent = document.getElementById('reportAgentFilter').value;
                if (selectedAgent && selectedAgent !== 'all') {
                    customers = customers.filter(c => c.assignedAgent === selectedAgent);
                    payments = payments.filter(p => p.collectedBy === selectedAgent);
                }
            }

            // CSV Header
            csvContent += "Payment ID,Date,Customer ID,Customer Name,Amount\n";

            // Sort payments by date descending
            const sortedPayments = [...payments].sort((a, b) => new Date(b.date) - new Date(a.date));

            sortedPayments.forEach(p => {
                const customer = customers.find(c => c.id === p.customerId);
                const customerName = customer ? getDisplayName(customer) : t('reportUnknown');

                const row = [
                    p.id,
                    p.date,
                    p.customerId,
                    `"${customerName}"`,
                    p.amount
                ];
                csvContent += row.join(",") + "\n";
            });
            filename = `pigmie_payments_${dateStr}.csv`;
        }

        // Trigger download
        if (isNativePlatform()) {
            const { Filesystem, Directory, Encoding } = Capacitor.Plugins;
            const { Share } = Capacitor.Plugins;

            Filesystem.writeFile({
                path: filename,
                data: csvContent,
                directory: Directory.Cache,
                encoding: Encoding.UTF8
            }).then(result => {
                Share.share({
                    title: 'Exported Data',
                    url: result.uri,
                    dialogTitle: 'Save or Share Export'
                }).then(() => {
                    showToast('Export successful!', 'success');
                }).catch(e => {
                    console.log('Share canceled or failed', e);
                });
            }).catch(e => {
                showToast('Failed to write file: ' + e.message, 'error');
            });
        } else {
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showToast('Export successful!', 'success');
        }
    } catch (e) {
        showToast('CSV Export failed: ' + e.message, 'error');
    }
}

// === Periodic Reports Export ===
function getStartOfWeek(dateStr) {
    const d = new Date(dateStr);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const result = new Date(d.setDate(diff));
    return result.toISOString().split('T')[0];
}

function getStartOfMonth(dateStr) {
    return dateStr.substring(0, 7) + "-01";
}

function exportPeriodicReport(format) {
    const isToday = document.getElementById('exportTodayCheck').checked;
    const isWeek = document.getElementById('exportWeekCheck').checked;
    const isMonth = document.getElementById('exportMonthCheck').checked;
    const isCustom = document.getElementById('exportCustomCheck').checked;

    if (!isToday && !isWeek && !isMonth && !isCustom) {
        showToast(t('selectAtLeastOne'), 'error');
        return;
    }

    const todayStr = getTodayStr();
    const weekStart = getStartOfWeek(todayStr);
    const monthStart = getStartOfMonth(todayStr);

    let payments = getPayments();
    let customers = getCustomers();

    // Apply agent filter if in Org Mode
    if (typeof appMode !== 'undefined' && appMode === 'org' && document.getElementById('reportAgentFilterGroup').style.display !== 'none') {
        const selectedAgent = document.getElementById('reportAgentFilter').value;
        if (selectedAgent && selectedAgent !== 'all') {
            payments = payments.filter(p => p.collectedBy === selectedAgent);
            customers = customers.filter(c => c.assignedAgent === selectedAgent);
        }
    }
    const reports = [];

    if (isToday) {
        reports.push({
            label: t('reportTitleToday'),
            data: payments.filter(p => p.date === todayStr),
            filename: `report_today_${todayStr}`
        });
    }

    if (isWeek) {
        reports.push({
            label: t('reportTitleWeek'),
            data: payments.filter(p => p.date >= weekStart && p.date <= todayStr),
            filename: `report_week_${todayStr}`
        });
    }

    if (isMonth) {
        reports.push({
            label: t('reportTitleMonth'),
            data: payments.filter(p => p.date >= monthStart && p.date <= todayStr),
            filename: `report_month_${todayStr}`
        });
    }

    if (isCustom) {
        const fromDate = document.getElementById('exportDateFrom').value;
        const toDate = document.getElementById('exportDateTo').value;
        if (!fromDate || !toDate) {
            showToast('Please select both From and To dates', 'error');
            return;
        }
        if (fromDate > toDate) {
            showToast('From date cannot be after To date', 'error');
            return;
        }
        reports.push({
            label: t('reportTitleCustom') || 'Custom Collection Report',
            data: payments.filter(p => p.date >= fromDate && p.date <= toDate),
            filename: `report_custom_${fromDate}_to_${toDate}`
        });
    }

    reports.forEach(report => {
        if (format === 'csv') {
            exportReportToCSV(report, customers);
        } else {
            exportReportToPDF(report, customers);
        }
    });
}

function exportReportToCSV(report, allCustomers) {
    let csv = `${t('reportSlNo')},${t('reportDate')},"${t('reportCustomerName')}",${t('reportPhone')},${t('reportAmount')}\n`;

    // Sort by date
    const sortedData = [...report.data].sort((a, b) => new Date(b.date) - new Date(a.date));

    let totalAmount = 0;
    const uniqueCustomers = new Set();

    sortedData.forEach((p, index) => {
        const cust = allCustomers.find(c => c.id === p.customerId);
        const dispName = getLocalizedCustomerName(cust);
        const phone = cust ? cust.phone : "-";

        totalAmount += p.amount;
        if (p.customerId) uniqueCustomers.add(p.customerId);

        csv += `${index + 1},${p.date},"${dispName}",${phone},${p.amount}\n`;
    });

    // Add summary rows at the bottom
    csv += `\n,,,,${t('reportTotalCollection')},${totalAmount}\n`;
    csv += `,,,,${t('reportTotalCustomers')},${uniqueCustomers.size}\n`;

    shareOrDownloadFile(`${report.filename}.csv`, csv, 'text/csv;charset=utf-8;', false);
}

function exportReportToPDF(report, allCustomers) {
    const bizName = getSettings().businessName || "Pigmie Record Manager";
    const totalAmount = report.data.reduce((sum, p) => sum + p.amount, 0);
    const uniqueCustomers = new Set(report.data.map(p => p.customerId).filter(id => id));

    // Sort by date
    const sortedData = [...report.data].sort((a, b) => new Date(b.date) - new Date(a.date));

    let html = `
    <div style="font-family: sans-serif; padding: 20px; color: #333; background: #fff; min-height: 100%;">
        <style>
            .pdf-header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #eee; padding-bottom: 20px; }
            .pdf-biz-name { font-size: 24px; font-weight: bold; margin-bottom: 5px; }
            .pdf-report-title { font-size: 18px; color: #666; }
            .pdf-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .pdf-table th, .pdf-table td { border: 1px solid #ddd; padding: 10px 8px; text-align: left; }
            .pdf-table th { background-color: #f8f9fa; font-weight: bold; }
            .pdf-table tr { page-break-inside: avoid; }
            .pdf-total-row { font-weight: bold; background-color: #eee; }
            .pdf-footer { margin-top: 30px; font-size: 12px; color: #999; text-align: center; }
        </style>
        
        <div class="pdf-header">
            <div class="pdf-biz-name">${bizName}</div>
            <div class="pdf-report-title">${report.label}</div>
            <div>Date Generated: ${new Date().toLocaleString()}</div>
        </div>

        <table class="pdf-table">
            <thead>
                <tr>
                    <th style="width: 50px;">${t('reportSlNo')}</th>
                    <th>${t('reportDate')}</th>
                    <th>${t('reportCustomerName')}</th>
                    <th>${t('reportPhone')}</th>
                    <th>${t('reportAmount')}</th>
                </tr>
            </thead>
            <tbody>
                ${sortedData.map((p, index) => {
        const cust = allCustomers.find(c => c.id === p.customerId);
        const dispName = getLocalizedCustomerName(cust);
        const localeAmount = p.amount.toLocaleString(getCurrentLocale());
        return `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${p.date}</td>
                        <td>${dispName}</td>
                        <td>${cust ? cust.phone : '-'}</td>
                        <td>₹${localeAmount}</td>
                    </tr>`;
    }).join('')}
                <tr class="pdf-total-row">
                    <td colspan="4" style="text-align: right;">${t('reportTotalCollection')}</td>
                    <td>₹${totalAmount.toLocaleString(getCurrentLocale())}</td>
                </tr>
                <tr class="pdf-total-row">
                    <td colspan="4" style="text-align: right;">${t('reportTotalCustomers')}</td>
                    <td>${uniqueCustomers.size}</td>
                </tr>
            </tbody>
        </table>

        <div class="pdf-footer">
            ${t('reportGeneratedBy')} ${bizName}
        </div>
    </div>`;

    if (typeof html2pdf !== 'undefined') {
        const container = document.createElement('div');
        container.innerHTML = html;

        const opt = {
            margin: 0.5,
            filename: `${report.filename}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
            pagebreak: { mode: ['css', 'legacy'] }
        };

        html2pdf().from(container).set(opt).outputPdf('datauristring').then(function (pdfAsString) {
            const base64Data = pdfAsString.split(',')[1];
            shareOrDownloadFile(`${report.filename}.pdf`, base64Data, 'application/pdf', true);
        });
    } else {
        // Fallback if library failed to load
        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(html + '<script>window.onload=function(){window.print();}</script>');
        printWindow.document.close();
    }
}



function triggerImport() {
    document.getElementById('importFileInput').click();
}

async function handleImportFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Reset file input so the same file can be selected again
    event.target.value = '';

    try {
        const text = await file.text();
        const backup = JSON.parse(text);

        // Validate structure
        if (!backup.customers || !Array.isArray(backup.customers) ||
            !backup.payments || !Array.isArray(backup.payments)) {
            showToast(t('backupInvalid'), 'error');
            return;
        }

        // Confirm overwrite
        const confirmed = await showConfirmImport(t('confirmImportBackup'));
        if (!confirmed) return;

        // Restore data
        saveCustomers(backup.customers);
        savePayments(backup.payments);
        if (backup.settings) {
            saveSettings(backup.settings);
        }

        showToast(t('backupImported'));
        // Removed updateSidebarBusinessName()
        refreshCurrentView();
    } catch (e) {
        showToast(t('backupInvalid'), 'error');
    }
}

function showConfirmImport(message) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'confirm-overlay';
        overlay.innerHTML = `
            <div class="confirm-dialog">
                <p>${message}</p>
                <div class="confirm-actions">
                    <button class="btn btn-secondary" id="confirmCancel">${t('confirmCancel')}</button>
                    <button class="btn btn-primary" id="confirmOk">${t('confirmImportBtn')}</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        overlay.querySelector('#confirmCancel').onclick = () => {
            overlay.remove();
            resolve(false);
        };
        overlay.querySelector('#confirmOk').onclick = () => {
            overlay.remove();
            resolve(true);
        };
    });
}

async function clearAllData() {
    const confirmed = await showDangerConfirm(t('confirmClearAll'));
    if (!confirmed) return;

    try {
        await clearLocalDatabase();
    } catch (e) {
        console.warn('Local database clear error:', e);
    }

    localStorage.removeItem(STORAGE_KEYS.CUSTOMERS);
    localStorage.removeItem(STORAGE_KEYS.PAYMENTS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem('pigmie_app_mode');
    localStorage.removeItem('pigmie_active_org');

    // Default settings will be regenerated on next load
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, currentLang); // preserve language

    showToast(t('dataCleared'));

    // Reload the app to clear everything completely
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}

// ========================================
// SETTINGS VIEW RENDERER
// ========================================

function renderSettingsView() {
    const settings = getSettings();
    const container = document.getElementById('settingsContainer');

    container.innerHTML = `
        <!-- Business Profile -->
        <div class="settings-section">
            <div class="settings-section-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                <h3>${t('settingsBusinessProfile')}</h3>
            </div>
            <div class="settings-section-body">
                <div class="settings-item">
                    <div class="settings-item-info">
                        <span class="settings-item-label">${t('settingsBusinessName')}</span>
                        <span class="settings-item-desc">${t('settingsBusinessNameDesc')}</span>
                    </div>
                    <div class="settings-item-action">
                        <input type="text" class="settings-input" id="settingsBusinessName" 
                            value="${escapeHtml(settings.businessName)}" 
                            placeholder="${t('settingsBusinessNamePh')}"
                            onchange="saveBusinessSetting('businessName', this.value)">
                    </div>
                </div>
                <div class="settings-divider"></div>
                <div class="settings-item">
                    <div class="settings-item-info">
                        <span class="settings-item-label">${t('settingsOwnerName')}</span>
                        <span class="settings-item-desc">${t('settingsOwnerNameDesc')}</span>
                    </div>
                    <div class="settings-item-action">
                        <input type="text" class="settings-input" id="settingsOwnerName" 
                            value="${escapeHtml(settings.ownerName)}" 
                            placeholder="${t('settingsOwnerNamePh')}"
                            onchange="saveBusinessSetting('ownerName', this.value)">
                    </div>
                </div>
            </div>
        </div>

        <!-- App Lock -->
        <div class="settings-section">
            <div class="settings-section-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <h3>${t('settingsAppLock')}</h3>
            </div>
            <div class="settings-section-body">
                <div class="settings-item">
                    <div class="settings-item-info">
                        <span class="settings-item-label">${t('settingsEnablePin')}</span>
                        <span class="settings-item-desc">${t('settingsEnablePinDesc')}</span>
                    </div>
                    <div class="settings-item-action">
                        <label class="toggle-switch">
                            <input type="checkbox" ${settings.pinEnabled ? 'checked' : ''} onchange="togglePinEnabled()">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>
                ${isBiometricAvailable ? `
                <div class="settings-divider"></div>
                <div class="settings-item">
                    <div class="settings-item-info">
                        <span class="settings-item-label">${t('settingsEnableBiometric')}</span>
                        <span class="settings-item-desc">${t('settingsEnableBiometricDesc')}</span>
                    </div>
                    <div class="settings-item-action">
                        <label class="toggle-switch">
                            <input type="checkbox" ${settings.biometricEnabled ? 'checked' : ''} onchange="toggleBiometricEnabled()">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>` : ''}
                ${settings.pinEnabled ? `
                <div class="settings-divider"></div>
                <div class="settings-item">
                    <div class="settings-item-info">
                        <span class="settings-item-label">${t('settingsChangePin')}</span>
                        <span class="settings-item-desc">${t('settingsChangePinDesc')}</span>
                    </div>
                    <div class="settings-item-action">
                        <button class="settings-btn settings-btn-primary" onclick="openPinModal(true)">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                            ${t('settingsChangePin')}
                        </button>
                    </div>
                </div>
                ` : ''}
            </div>
        </div>

        <!-- Cloud Backup -->
        <div class="settings-section">
            <div class="settings-section-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
                </svg>
                <h3>Cloud Backup</h3>
            </div>
            <div class="settings-section-body">
                <div class="settings-item">
                    <div class="settings-item-info">
                        <span class="settings-item-label">Auto Cloud Sync</span>
                        <span class="settings-item-desc">Silently back up to Firebase when data changes</span>
                    </div>
                    <div class="settings-item-action">
                        <label class="toggle-switch">
                            <input type="checkbox" ${settings.autoCloudSync ? 'checked' : ''} onchange="toggleAutoSync()">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <!-- Cloud Sync -->
        <div class="settings-section">
            <div class="settings-section-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
                </svg>
                <h3>Cloud Sync & Auto Backup</h3>
            </div>
            <div class="settings-section-body">
                <!-- Removed redundant Firebase Config input -->
                <div class="settings-item">
                    <div class="settings-item-info">
                        <span class="settings-item-label">Sync Status</span>
                        <span class="settings-item-desc" id="syncStatusText">Checking...</span>
                    </div>
                    <div class="settings-item-action" style="gap: 8px;">
                        <button class="settings-btn settings-btn-primary" id="syncLoginBtn" onclick="signInWithGoogle()" style="display: none;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                            Login with Google
                        </button>
                        <button class="settings-btn settings-btn-danger" id="syncLogoutBtn" onclick="signOutFirebase()" style="display: none;">Logout</button>
                    </div>
                </div>
                
                <div class="settings-item">
                    <div class="settings-item-info">
                        <span class="settings-item-label">Manual Sync Actions</span>
                        <span class="settings-item-desc">Background sync happens automatically</span>
                    </div>
                    <div class="settings-item-action" style="gap: 8px;">
                        <button class="settings-btn settings-btn-success" id="syncPushBtn" onclick="pushToCloud(true)" style="display: none;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                            Sync Now
                        </button>
                        <button class="settings-btn settings-btn-info" id="syncPullBtn" onclick="pullFromCloud()" style="display: none;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            Restore Data
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Backup & Restore -->
        <div class="settings-section">
            <div class="settings-section-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <h3>${t('settingsBackupRestore')}</h3>
            </div>
            <div class="settings-section-body">
                <div class="settings-item">
                    <div class="settings-item-info">
                        <span class="settings-item-label">${t('settingsExportBackup')}</span>
                        <span class="settings-item-desc">${t('settingsExportBackupDesc')}</span>
                    </div>
                    <div class="settings-item-action">
                        <button class="settings-btn settings-btn-success" onclick="exportBackup()">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="7 10 12 15 17 10"/>
                                <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                            ${t('settingsExportBackup')}
                        </button>
                    </div>
                </div>
                <div class="settings-divider"></div>
                <div class="settings-item">
                    <div class="settings-item-info">
                        <span class="settings-item-label">${t('settingsImportBackup')}</span>
                        <span class="settings-item-desc">${t('settingsImportBackupDesc')}</span>
                    </div>
                    <div class="settings-item-action">
                        <button class="settings-btn settings-btn-info" onclick="triggerImport()">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="17 8 12 3 7 8"/>
                                <line x1="12" y1="3" x2="12" y2="15"/>
                            </svg>
                            ${t('settingsImportBackup')}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Appearance -->
        <div class="settings-section">
            <div class="settings-section-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
                <h3>${t('appearance')}</h3>
            </div>
            <div class="settings-section-body">
                <div class="settings-item">
                    <div class="settings-item-info">
                        <span class="settings-item-label">${t('themeMode')}</span>
                        <span class="settings-item-desc">${t('themeModeDesc')}</span>
                    </div>
                    <div class="settings-item-action">
                        <label class="toggle-switch">
                            <input type="checkbox" id="themeToggle" onchange="toggleTheme()" ${settings.theme === 'light' ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <!-- Danger Zone -->
        <div class="settings-section danger-zone">
            <div class="settings-section-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <h3>${t('settingsDangerZone')}</h3>
            </div>
            <div class="settings-section-body">
                <div class="settings-item">
                    <div class="settings-item-info">
                        <span class="settings-item-label">${t('settingsClearAll')}</span>
                        <span class="settings-item-desc">${t('settingsClearAllDesc')}</span>
                    </div>
                    <div class="settings-item-action">
                        <button class="settings-btn settings-btn-danger" onclick="clearAllData()">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                            ${t('settingsClearAll')}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- About -->
        <div class="settings-about">
            <div class="app-version">${t('settingsAboutVersion')}</div>
            <div>${t('settingsAboutCredit')}</div>
        </div>
    `;

    if (typeof updateSyncUI === 'function') {
        updateSyncUI();
    }
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
}

function saveBusinessSetting(key, value) {
    const settings = getSettings();
    settings[key] = value;
    saveSettings(settings);
    if (key === 'businessName') {
        // Removed updateSidebarBusinessName()
    }
    showToast(t('settingsSaved'));
}

function toggleAutoSync() {
    const settings = getSettings();
    settings.autoCloudSync = !settings.autoCloudSync;
    saveSettings(settings);
    showToast(settings.autoCloudSync ? 'Auto Sync Enabled' : 'Auto Sync Disabled', 'success');
}

// === Transliteration ===
async function transliterateToKannada(text) {
    try {
        const response = await fetch('https://inputtools.google.com/request?text=' + encodeURIComponent(text) + '&itc=kn-t-i0-und&num=1');
        const data = await response.json();
        if (data[0] === 'SUCCESS' && data[1] && data[1][0] && data[1][0][1] && data[1][0][1][0]) {
            return data[1][0][1][0];
        }
    } catch (e) {
        console.error('Transliteration failed', e);
    }
    return text;
}

async function syncKannadaNames() {
    const customers = getCustomers();
    let modified = false;
    for (let i = 0; i < customers.length; i++) {
        if (!customers[i].nameKn) {
            customers[i].nameKn = await transliterateToKannada(customers[i].name);
            modified = true;
        }
    }
    if (modified) {
        saveCustomers(customers);
        refreshCurrentView();
    }
}

// === Onboarding Flow ===
function selectInitialMode(mode, role = null) {
    localStorage.setItem('pigmie_initial_mode', mode);
    if (role) {
        localStorage.setItem('pigmie_initial_role', role);
    } else {
        localStorage.removeItem('pigmie_initial_role');
    }
    
    // Hide onboarding
    const onboardingUI = document.getElementById('onboardingUI');
    if (onboardingUI) onboardingUI.style.display = 'none';
    
    // If the user is already logged into Firebase, directly enter app mode
    if (window.currentUser || (window.firebase && firebase.auth().currentUser)) {
        if (typeof selectAppMode === 'function') {
            selectAppMode(mode);
        }
    } else {
        // Show login
        const loginUI = document.getElementById('loginUI');
        if (loginUI) loginUI.classList.add('active');
    }
}

function showInitialOrgRoleSelection() {
    document.getElementById('onboardingPage1').style.display = 'none';
    document.getElementById('onboardingPage2').style.display = 'flex';
}

function hideInitialOrgRoleSelection() {
    document.getElementById('onboardingPage2').style.display = 'none';
    document.getElementById('onboardingPage1').style.display = 'flex';
}

function submitInitialJoinRequest() {
    const orgId = document.getElementById('joinOrgIdInput').value.trim();
    if (!orgId) {
        showToast('Please enter an Organization ID', 'error');
        return;
    }
    
    if (typeof requestToJoinOrgWithId === 'function') {
        requestToJoinOrgWithId(orgId);
    } else {
        showToast('Organization functions not loaded', 'error');
    }
}

async function submitInitialCreateRequest() {
    const orgName = document.getElementById('createOrgNameInput').value.trim();
    if (!orgName) {
        showToast('Please enter an Organization Name', 'error');
        return;
    }
    
    if (typeof createOrganization === 'function') {
        const orgId = await createOrganization(orgName);
        if (orgId) {
            document.getElementById('createOrgUI').style.display = 'none';
            localStorage.setItem('pigmie_active_org', orgId);
            
            // selectAppMode will show appUI and switch to org dashboard
            // after async Firestore data loads
            selectAppMode('org', orgId);
        }
    } else {
        showToast('Organization functions not loaded', 'error');
    }
}

// === Initialization ===
async function init() {
    // Apply saved language
    applyTranslations();

    // Mode selection is now handled pre-login in sync.js and onboarding UI.

    // Trigger name transliteration in background
    syncKannadaNames();

    // Check Biometric Availability
    if (window.Capacitor && window.Capacitor.Plugins.NativeBiometric) {
        try {
            const result = await window.Capacitor.Plugins.NativeBiometric.isAvailable();
            isBiometricAvailable = result.isAvailable;
        } catch (e) {
            console.log("Biometric not available", e);
            isBiometricAvailable = false;
        }
    }

    // Check PIN lock
    const settings = getSettings();
    if (settings.pinEnabled && settings.pinHash) {
        showLockScreen();
        if (settings.biometricEnabled && isBiometricAvailable) {
            triggerBiometricAuth();
        }
    }

    // Update sidebar business name
    // Removed updateSidebarBusinessName()

    // Set current date display
    updateCurrentDateDisplay();

    // Set daily entry date to today
    document.getElementById('entryDate').value = getTodayStr();

    // Set page title for initial view
    updatePageTitle();

    // Initial refresh
    refreshCurrentView();

    // Close modals on overlay click
    document.getElementById('customerModal').addEventListener('click', function (e) {
        if (e.target === this) closeCustomerModal();
    });
    document.getElementById('detailModal').addEventListener('click', function (e) {
        if (e.target === this) closeDetailModal();
    });
    document.getElementById('pinModal').addEventListener('click', function (e) {
        if (e.target === this) closePinModal();
    });

    // Keyboard shortcut: Escape to close modals
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeCustomerModal();
            closeDetailModal();
            closePinModal();
        }
    });
}

// Run on load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize IndexedDB then start app
    if ('indexedDB' in window) {
        initDB().then(() => {
            init();
        }).catch(err => {
            console.error("Failed to initialize IndexedDB. Falling back to localStorage?", err);
            init(); // Try to load anyway
        });
    } else {
        init();
    }

    // Register Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }

    // === Android Back Button: Double-tap to exit ===
    if (isNativePlatform()) {
        let lastBackPress = 0;
        document.addEventListener('ionBackButton', (ev) => {
            ev.detail.register(10, () => {
                const now = Date.now();
                if (now - lastBackPress < 2000) {
                    // Second press within 2 seconds — exit app
                    if (window.Capacitor.Plugins.App) {
                        window.Capacitor.Plugins.App.exitApp();
                    }
                } else {
                    lastBackPress = now;
                    showToast(t('pressBackAgain') || 'Press back again to exit', 'info');
                }
            });
        });

        // Also handle the native Capacitor backButton event
        if (window.Capacitor.Plugins.App) {
            window.Capacitor.Plugins.App.addListener('backButton', ({ canGoBack }) => {
                const now = Date.now();
                if (now - lastBackPress < 2000) {
                    window.Capacitor.Plugins.App.exitApp();
                } else {
                    lastBackPress = now;
                    showToast(t('pressBackAgain') || 'Press back again to exit', 'info');
                }
            });
        }
    }
});

// === Phase 6: Image Handling ===
function handleImageUpload(event, previewId, base64Id, isRect = false) {
    const file = event.target.files[0];
    if (!file) return;

    // Security & Storage Validation: Max 5MB & Image type only
    if (file.size > 5 * 1024 * 1024) {
        showToast('Image file size must be less than 5MB', 'error');
        event.target.value = '';
        return;
    }
    if (!file.type || !file.type.startsWith('image/')) {
        showToast('Please select a valid image file', 'error');
        event.target.value = '';
        return;
    }

    compressImage(file, isRect ? 1024 : 500, (base64) => {
        document.getElementById(base64Id).value = base64;

        const previewEl = document.getElementById(previewId);
        if (previewEl.tagName === 'IMG') {
            previewEl.src = base64;
            previewEl.style.display = 'block';
            const textEl = document.getElementById(previewId.replace('PreviewImg', 'Text'));
            if (textEl) textEl.style.display = 'none';
        } else {
            previewEl.innerHTML = '';
            previewEl.style.backgroundImage = `url(${base64})`;
        }
    });
}

function compressImage(file, maxWidth, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            if (width > maxWidth) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Compress to JPEG with 0.7 quality
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
            callback(compressedBase64);
        };
    };
}

function viewIdProof(customerId) {
    const customer = getCustomers().find(c => c.id === customerId);
    if (!customer || !customer.idProof) return;

    document.getElementById('idProofViewerImg').src = customer.idProof;
    document.getElementById('idProofModal').classList.add('active');
}

function closeIdProofModal() {
    document.getElementById('idProofModal').classList.remove('active');
}

// === Digital Receipts ===
let currentReceiptText = '';

function showReceipt(paymentId, customerId) {
    const customer = getCustomers().find(c => c.id === customerId);
    const payments = getPayments();
    const payment = payments.find(p => p.id === paymentId);

    if (!customer || !payment) return;

    const settings = getSettings();
    const bizName = settings.businessName || 'Pigmie Record Manager';

    // Calculate running totals up to this payment date
    const customerPayments = payments.filter(p => p.customerId === customerId);
    const totalPaid = customerPayments.reduce((sum, p) => sum + p.amount, 0);
    const totalRepayable = calculateTotalRepayable(customer);
    const pending = Math.max(0, totalRepayable - totalPaid);

    document.getElementById('receiptBizName').textContent = bizName;
    document.getElementById('receiptDate').textContent = `Date: ${formatDate(payment.date)}`;
    document.getElementById('receiptCustName').textContent = getDisplayName(customer);
    document.getElementById('receiptAmount').textContent = formatCurrency(payment.amount);
    document.getElementById('receiptTotalLoan').textContent = formatCurrency(totalRepayable);
    document.getElementById('receiptPending').textContent = formatCurrency(pending);

    // Prepare text for sharing
    currentReceiptText = `*🧾 Payment Receipt*\n\n*${bizName}*\nDate: ${formatDate(payment.date)}\n\nCustomer: ${getDisplayName(customer)}\n*Amount Paid: ${formatCurrency(payment.amount)}*\n\nTotal Loan: ${formatCurrency(totalRepayable)}\nPending Balance: ${formatCurrency(pending)}\n\nThank you!`;

    document.getElementById('receiptModal').classList.add('active');
}

function closeReceiptModal() {
    document.getElementById('receiptModal').classList.remove('active');
}

function shareReceipt() {
    if (!currentReceiptText) return;
    const encoded = encodeURIComponent(currentReceiptText);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
}

// === Theme Management ===
function initTheme() {
    const settings = getSettings();

    // Auto-detect system theme if no manual preference saved
    if (!settings.theme) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        settings.theme = prefersDark ? 'dark' : 'light';
    }

    applyTheme(settings.theme);

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const currentSettings = getSettings();
        // Only auto-switch if user hasn't manually overridden
        if (!currentSettings.themeManual) {
            currentSettings.theme = e.matches ? 'dark' : 'light';
            localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(currentSettings));
            applyTheme(currentSettings.theme);
        }
    });
}

function applyTheme(theme) {
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    const toggle = document.getElementById('themeToggle');
    if (toggle) toggle.checked = (theme === 'light');
}

function toggleTheme() {
    const toggle = document.getElementById('themeToggle');
    const isLight = toggle.checked;
    const theme = isLight ? 'light' : 'dark';

    applyTheme(theme);

    // Save to settings with manual override flag
    const settings = getSettings();
    settings.theme = theme;
    settings.themeManual = true;
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));

    showToast('Theme Updated', 'success');
}

document.addEventListener('DOMContentLoaded', initTheme);
