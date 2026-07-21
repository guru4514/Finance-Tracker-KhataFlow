// ========================================
// CLOUD SYNC SYSTEM (Firebase)
// ========================================

let firebaseApp = null;
let cloudDb = null;
let auth = null;
let currentUser = null;
let isSyncing = false;
let unsupportedAuthToastShown = false;

const AUTH_ENVIRONMENT_MESSAGE = "Cloud sign-in needs http://localhost or https://. Start the local web server instead of opening index.html directly.";
const WEB_AUTH_PROTOCOLS = ['http:', 'https:', 'chrome-extension:'];

// firebaseConfig is loaded from firebase-config.js (included via script tag in index.html)
// See firebase-config.example.js for the template.

function isNativePlatform() {
    return !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
}

function isFirebaseAuthEnvironmentSupported() {
    return isNativePlatform() || WEB_AUTH_PROTOCOLS.includes(window.location.protocol);
}

function showAuthEnvironmentWarning() {
    if (unsupportedAuthToastShown || typeof showToast !== 'function') return;
    unsupportedAuthToastShown = true;
    showToast(AUTH_ENVIRONMENT_MESSAGE, "error");
}

function setLoginControlsDisabled(disabled) {
    ['emailInput', 'passwordInput'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.disabled = disabled;
    });

    document.querySelectorAll('#loginUI button').forEach((button) => {
        button.disabled = disabled;
        button.title = disabled ? AUTH_ENVIRONMENT_MESSAGE : '';
    });
}

function showUnsupportedAuthEnvironment() {
    const loginUI = document.getElementById('loginUI');
    const appUI = document.getElementById('appUI');
    if (loginUI) loginUI.classList.add('active');
    if (appUI) appUI.classList.remove('active');
    setLoginControlsDisabled(true);
    showAuthEnvironmentWarning();
}

function canUseCloudAuth() {
    if (isFirebaseAuthEnvironmentSupported()) return true;
    showUnsupportedAuthEnvironment();
    return false;
}

/**
 * Initialize Firebase with the provided configuration.
 * @param {Object} config - Firebase configuration object
 */
function initFirebase(config) {
    if (!canUseCloudAuth()) {
        console.warn("Firebase Auth is unavailable for protocol:", window.location.protocol);
        return false;
    }

    if (!config || !config.apiKey) {
        console.warn("Firebase config is missing or invalid.");
        return false;
    }

    try {
        if (!firebase.apps.length) {
            firebaseApp = firebase.initializeApp(config);
        } else {
            firebaseApp = firebase.app();
        }
        cloudDb = firebase.firestore();
        auth = firebase.auth();
        setLoginControlsDisabled(false);

        // Listen for auth state changes
        auth.onAuthStateChanged(async (user) => {
            currentUser = user;
            updateSyncUI();
            const loginUI = document.getElementById('loginUI');
            const appUI = document.getElementById('appUI');
            const onboardingUI = document.getElementById('onboardingUI');
            const joinOrgUI = document.getElementById('joinOrgUI');
            const pendingUI = document.getElementById('pendingApprovalUI');
            const createOrgUI = document.getElementById('createOrgUI');

            // Hide all UIs first
            if (loginUI) loginUI.classList.remove('active');
            if (appUI) appUI.classList.remove('active');
            if (onboardingUI) onboardingUI.style.display = 'none';
            if (joinOrgUI) joinOrgUI.style.display = 'none';
            if (pendingUI) pendingUI.style.display = 'none';
            if (createOrgUI) createOrgUI.style.display = 'none';

            if (user) {
                console.log("Firebase Auth: Logged in as", user.email);

                let initialMode = localStorage.getItem('pigmie_initial_mode');
                let initialRole = localStorage.getItem('pigmie_initial_role');

                // ALWAYS check cloud to restore session in case local storage was cleared
                try {
                    const userDoc = await cloudDb.collection('users').doc(user.uid).get();
                    if (userDoc.exists) {
                        if (userDoc.data().activeOrgId) {
                            initialMode = 'org';
                            const orgId = userDoc.data().activeOrgId;
                            localStorage.setItem('pigmie_active_org', orgId);
                            localStorage.setItem('pigmie_initial_mode', 'org');

                            // Try to get actual role from members
                            const memberDoc = await cloudDb.collection('orgs').doc(orgId).collection('members').doc(user.uid).get();
                            if (memberDoc.exists) {
                                initialRole = memberDoc.data().role;
                                localStorage.setItem('pigmie_initial_role', initialRole);
                            } else {
                                initialRole = 'agent';
                            }
                        } else if (userDoc.data().customers || userDoc.data().lastSynced) {
                            // User has a backup in their personal cloud profile!
                            initialMode = 'personal';
                            localStorage.setItem('pigmie_initial_mode', 'personal');
                        }
                    }
                } catch (e) {
                    console.error('Failed to fetch user cloud profile:', e);
                }

                if (!initialMode) {
                    // No mode saved and no org found in cloud.
                    // Show onboarding so they can select a mode. Do NOT sign out.
                    console.log("No mode saved. Showing onboarding.");
                    if (onboardingUI) onboardingUI.style.display = 'flex';
                    return;
                }

                // If org, handle org routing with real-time approval listener
                if (initialMode === 'org') {
                    const orgId = localStorage.getItem('pigmie_active_org');

                    if (initialRole === 'admin' || initialRole === 'owner') {
                        // Admins/Owners can create orgs. Check if they already have one.
                        if (!orgId) {
                            if (document.getElementById('createOrgUI')) {
                                document.getElementById('createOrgUI').style.display = 'flex';
                            }
                        } else {
                            selectAppMode(initialMode, orgId);
                        }
                    } else {
                        // Non-admin. Check if they have an org to check against.
                        if (!orgId) {
                            // No org yet, show join UI
                            if (joinOrgUI) joinOrgUI.style.display = 'flex';
                        } else {
                            // Start real-time listener for approval status
                            if (window.userApprovalListener) {
                                window.userApprovalListener();
                            }
                            window.userApprovalListener = cloudDb.collection('orgs').doc(orgId).collection('members').doc(user.uid)
                                .onSnapshot(doc => {
                                    if (doc.exists) {
                                        const data = doc.data();
                                        if (data.status === 'approved' || data.status === 'active' || !data.status) {
                                            if (pendingUI) pendingUI.style.display = 'none';
                                            selectAppMode(initialMode, orgId);
                                            // Once approved, we can optionally unsubscribe, but keeping it is fine.
                                        } else if (data.status === 'pending') {
                                            if (pendingUI) pendingUI.style.display = 'flex';
                                            if (joinOrgUI) joinOrgUI.style.display = 'none';
                                            if (appUI) appUI.classList.remove('active');
                                        } else {
                                            // Rejected
                                            if (pendingUI) pendingUI.style.display = 'none';
                                            if (joinOrgUI) joinOrgUI.style.display = 'flex';
                                        }
                                    } else {
                                        if (pendingUI) pendingUI.style.display = 'none';
                                        if (joinOrgUI) joinOrgUI.style.display = 'flex';
                                    }
                                }, err => {
                                    console.error("Approval listener error:", err);
                                    if (joinOrgUI) joinOrgUI.style.display = 'flex';
                                });
                        }
                    }
                } else {
                    // Personal mode
                    selectAppMode(initialMode);
                    await pullFromCloud(true); // Pull cloud data to local on login
                }
            } else {
                console.log("Firebase Auth: Logged out");
                // Check if they need onboarding
                if (localStorage.getItem('pigmie_initial_mode')) {
                    if (loginUI) loginUI.classList.add('active');
                } else {
                    if (onboardingUI) onboardingUI.style.display = 'flex';
                }
            }
        });

        return true;
    } catch (error) {
        console.error("Firebase Initialization Error:", error);
        return false;
    }
}

/**
 * Sign in using Google Auth Provider
 */
async function signInWithGoogle() {
    if (!canUseCloudAuth()) return;

    if (!auth) {
        showToast("Please save your Firebase Config first", "error");
        return;
    }

    try {
        if (isNativePlatform()) {
            const result = await Capacitor.Plugins.FirebaseAuthentication.signInWithGoogle();
            const credential = firebase.auth.GoogleAuthProvider.credential(result.credential.idToken, result.credential.accessToken);
            await auth.signInWithCredential(credential);
            showToast("Successfully signed in!", "success");
        } else {
            const provider = new firebase.auth.GoogleAuthProvider();
            await auth.signInWithPopup(provider);
        }
    } catch (error) {
        console.error("Sign-in error:", error);
        showToast("Sign-in failed: " + error.message, "error");
    }
}

async function signInWithEmail() {
    if (!canUseCloudAuth()) return;

    const email = document.getElementById('emailInput').value.trim();
    const password = document.getElementById('passwordInput').value;

    if (!email || !password) {
        showToast("Please enter both email and password", "error");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast("Please enter a valid email address (e.g., name@gmail.com)", "error");
        return;
    }

    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        showToast("Successfully signed in!", "success");
    } catch (error) {
        console.error("Email sign-in error:", error);
        showToast("Sign-in failed: " + error.message, "error");
    }
}

async function signUpWithEmail() {
    if (!canUseCloudAuth()) return;

    const email = document.getElementById('emailInput').value.trim();
    const password = document.getElementById('passwordInput').value;

    if (!email || !password) {
        showToast("Please enter both email and password", "error");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast("Please enter a valid email address (e.g., name@gmail.com)", "error");
        return;
    }

    if (password.length < 6) {
        showToast("Password should be at least 6 characters", "error");
        return;
    }

    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        // Send email verification to the new user
        if (userCredential.user) {
            await userCredential.user.sendEmailVerification();
            showToast("Account created! Check your email for verification.", "success");
        }
    } catch (error) {
        console.error("Email sign-up error:", error);
        showToast("Sign-up failed: " + error.message, "error");
    }
}

/**
 * Log login events to Firestore for auditing & email notifications.
 * A Firebase Cloud Function can listen to /loginEvents and send email alerts.
 */
async function logLoginEvent(user) {
    if (!cloudDb || !user) return;

    try {
        const deviceInfo = {
            platform: isNativePlatform() ? 'Android App' : 'Web Browser',
            userAgent: navigator.userAgent.substring(0, 100),
            language: navigator.language
        };

        await cloudDb.collection('loginEvents').add({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || '',
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            device: deviceInfo
        });

        console.log("Login event logged for", user.email);
    } catch (error) {
        // Non-critical — don't block the user
        console.warn("Failed to log login event:", error.message);
    }
}

/**
 * Sign out of Firebase
 */
async function signOutFirebase() {
    if (auth) {
        // Automatically sync data before logging out
        if (currentUser) {
            showToast(typeof t === 'function' ? (t('syncingBeforeLogout') || 'Syncing before logout...') : 'Syncing before logout...');
            await pushToCloud(false); // background push
        }

        if (isNativePlatform()) {
            await Capacitor.Plugins.FirebaseAuthentication.signOut();
        }
        await auth.signOut();

        // Wipe local database for Account Isolation
        if (typeof clearLocalDatabase === 'function') {
            await clearLocalDatabase();
        }

        localStorage.removeItem('hasInitialSync');
        localStorage.removeItem('pigmie_initial_mode');
        localStorage.removeItem('pigmie_initial_role');
        localStorage.removeItem('pigmie_active_org');
        localStorage.removeItem('pigmie_app_mode');

        showToast("Signed out", "success");
        if (typeof refreshCurrentView === 'function') refreshCurrentView();
    }
}

/**
 * Push local data to Firestore
 */
async function pushToCloud(showNotification = false) {
    if (!cloudDb || !currentUser || isSyncing) return;
    if (appMode === 'org') return; // Do not push personal data in org mode

    // Respect the autoCloudSync setting if this is a background sync
    const settings = typeof getSettings === 'function' ? getSettings() : { autoCloudSync: false };
    if (!showNotification && !settings.autoCloudSync) return;

    isSyncing = true;
    updateSyncUI();

    try {
        const customers = getCustomers();
        const payments = getPayments();
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();

        // We store everything in a single document under the user's UID to keep reads/writes cheap
        const userRef = cloudDb.collection('users').doc(currentUser.uid);

        await userRef.set({
            customers: JSON.stringify(customers),
            payments: JSON.stringify(payments),
            lastSynced: timestamp,
            email: currentUser.email
        });

        // Update local sync timestamp
        const syncSettings = getSettings();
        syncSettings.lastSynced = new Date().toISOString();
        saveSettings(syncSettings);

        if (showNotification) {
            showToast("Successfully synced to cloud!", "success");
        }
        console.log("Background sync complete.");
    } catch (error) {
        console.error("Cloud Sync Error:", error);
        if (showNotification) {
            showToast("Sync failed: " + error.message, "error");
        }
    } finally {
        isSyncing = false;
        updateSyncUI();
    }
}

/**
 * Pull data from Firestore and overwrite local database
 */
async function pullFromCloud(force = false) {
    if (!cloudDb || !currentUser || isSyncing) return;
    if (appMode === 'org') return; // Do not pull personal data in org mode

    if (!force) {
        if (!confirm("Are you sure? This will OVERWRITE your local data with the cloud data!")) {
            return;
        }
    }

    isSyncing = true;
    updateSyncUI();

    try {
        const userRef = cloudDb.collection('users').doc(currentUser.uid);
        const doc = await userRef.get();

        if (doc.exists) {
            const data = doc.data();
            const customers = JSON.parse(data.customers || '[]');
            const payments = JSON.parse(data.payments || '[]');

            // Save to local IndexedDB
            saveCustomers(customers);
            savePayments(payments);

            // Update local sync timestamp
            const settings = getSettings();
            if (data.lastSynced) {
                // If it's a Firestore timestamp
                settings.lastSynced = data.lastSynced.toDate ? data.lastSynced.toDate().toISOString() : new Date().toISOString();
            } else {
                settings.lastSynced = new Date().toISOString();
            }
            saveSettings(settings);

            showToast("Data restored successfully!", "success");

            // Refresh current view
            if (typeof refreshDashboard === 'function' && document.getElementById('view-dashboard').classList.contains('active')) {
                refreshDashboard();
            }
        } else {
            showToast("No backup found in cloud.", "error");
        }
    } catch (error) {
        console.error("Restore Error:", error);
        showToast("Restore failed: " + error.message, "error");
    } finally {
        isSyncing = false;
        updateSyncUI();
    }
}

/**
 * Update the Sync UI in Settings
 */
function updateSyncUI() {
    const statusEl = document.getElementById('syncStatusText');
    const loginBtn = document.getElementById('syncLoginBtn');
    const logoutBtn = document.getElementById('syncLogoutBtn');
    const pushBtn = document.getElementById('syncPushBtn');
    const pullBtn = document.getElementById('syncPullBtn');

    if (!statusEl) return; // UI not rendered yet

    if (!isFirebaseAuthEnvironmentSupported()) {
        statusEl.innerHTML = `<span style="color: var(--danger-500)">Cloud sign-in needs http://localhost or https://</span>`;
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (pushBtn) pushBtn.style.display = 'none';
        if (pullBtn) pullBtn.style.display = 'none';
        return;
    }

    if (firebaseApp && auth) {

        if (currentUser) {
            const settings = getSettings();
            let syncTime = "Never";
            if (settings.lastSynced) {
                const d = new Date(settings.lastSynced);
                syncTime = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
            }

            statusEl.innerHTML = `<span style="color: var(--success-500)">✓ Logged in as ${currentUser.email}</span><br><small style="color: var(--text-muted)">Last Synced: ${syncTime}</small>`;
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
            pushBtn.style.display = 'inline-block';
            pullBtn.style.display = 'inline-block';

            if (isSyncing) {
                pushBtn.disabled = true;
                pullBtn.disabled = true;
                pushBtn.textContent = 'Syncing...';
            } else {
                pushBtn.disabled = false;
                pullBtn.disabled = false;
                pushBtn.textContent = 'Sync to Cloud';
            }
        } else {
            statusEl.innerHTML = `<span style="color: var(--warning-500)">⚠ Not logged in</span>`;
            loginBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'none';
            pushBtn.style.display = 'none';
            pullBtn.style.display = 'none';
        }
    } else {
        statusEl.innerHTML = `<span style="color: var(--danger-500)">❌ Firebase not configured</span>`;
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (pushBtn) pushBtn.style.display = 'none';
        if (pullBtn) pullBtn.style.display = 'none';
    }
}

// Attempt to initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initFirebase(firebaseConfig);
});
