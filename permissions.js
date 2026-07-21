// permissions.js — Centralized Permission System

const PERMISSIONS = {
    // Dashboard
    VIEW_ORG_DASHBOARD:    ['owner', 'admin', 'manager'],
    VIEW_AGENT_ACTIVITY:   ['owner', 'admin', 'manager'],
    VIEW_APPROVALS:        ['owner', 'admin', 'manager'],
    VIEW_AUDIT_LOG:        ['owner', 'admin'],
    
    // Customers
    ADD_CUSTOMER:          ['owner', 'admin', 'manager', 'agent', 'collector'],
    EDIT_CUSTOMER:         ['owner', 'admin', 'manager'],
    DELETE_CUSTOMER:       ['owner', 'admin'],
    ASSIGN_AGENT:          ['owner', 'admin', 'manager'],
    
    // Payments
    ADD_PAYMENT:           ['owner', 'admin', 'manager', 'agent', 'collector'],
    DELETE_PAYMENT:        ['owner', 'admin', 'agent', 'collector'],
    EDIT_PAYMENT:          ['owner', 'admin'],
    
    // Loans
    CLOSE_LOAN:            ['owner', 'admin', 'manager', 'agent', 'collector'],
    RENEW_LOAN:            ['owner', 'admin', 'manager'],
    
    // Organization
    INVITE_MEMBERS:        ['owner', 'admin'],
    APPROVE_REQUESTS:      ['owner', 'admin', 'manager'], // Updated to allow managers
    CHANGE_ROLES:          ['owner', 'admin'],
    MANAGE_SETTINGS:       ['owner', 'admin'],

    // Reports
    VIEW_ALL_AGENT_REPORTS:['owner', 'admin', 'manager'],
    FILTER_BY_AGENT:       ['owner', 'admin', 'manager'],
};

// Actions that require approval instead of direct execution for specific roles
const REQUIRES_APPROVAL = {
    agent:     ['ADD_CUSTOMER', 'DELETE_PAYMENT', 'CLOSE_LOAN'],
    collector: ['ADD_CUSTOMER', 'DELETE_PAYMENT', 'CLOSE_LOAN'],
};

function canPerform(action) {
    if (typeof appMode === 'undefined' || appMode !== 'org') return true; // Personal mode = no restrictions
    const allowedRoles = PERMISSIONS[action];
    if (!allowedRoles) return false;
    
    // currentOrgMemberRole is global from org.js
    const role = (typeof currentOrgMemberRole !== 'undefined' && currentOrgMemberRole) ? currentOrgMemberRole : 'agent';
    return allowedRoles.includes(role);
}

function needsApproval(action) {
    if (typeof appMode === 'undefined' || appMode !== 'org') return false;
    
    const role = (typeof currentOrgMemberRole !== 'undefined' && currentOrgMemberRole) ? currentOrgMemberRole : 'agent';
    const roleApprovals = REQUIRES_APPROVAL[role];
    if (!roleApprovals) return false;
    return roleApprovals.includes(action);
}
