# 🐷 Pigmie Record Management System (KhataFlow)

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![Platform](https://img.shields.io/badge/platform-Web%20%7C%20Android-orange.svg)
![Stack](https://img.shields.io/badge/stack-Vanilla%20JS%20%7C%20Firebase%20%7C%20Capacitor-purple.svg)

**Pigmie** (Finance Tracker) is a modern, high-performance financial record and collection management solution tailored for finance agents, daily micro-finance collectors, and loan management organizations. Designed with an offline-first architecture, multi-tenant cloud sync, and native Android support, Pigmie streamlines daily collections, payment audits, and loan passbooks.

---

## 🌟 Key Features

### 🔄 Dual Operating Modes
* **Personal Mode (Offline-First):** Built for independent agents. Leverages browser **IndexedDB** for zero-latency local operations without needing an internet connection. Includes optional manual or scheduled auto-backup to Firebase cloud storage.
* **Organization Mode (Real-Time Cloud Sync):** Built for multi-agent teams. Connects directly to **Firebase Firestore** with real-time listeners for live collaborative updates and strict cache collision avoidance.

### 🛂 Granular Role-Based Access Control (RBAC)
Configurable permission matrices (`permissions.js`) govern access based on organizational roles:
* **👑 Owner / Admin:** Full control over organization settings, member invitations, role assignments, audit logs, and approval queues.
* **👔 Manager:** Access to org-wide dashboards, agent performance reports, customer assignments, and approval workflows.
* **🚶 Agent / Collector:** Operational view restricted to assigned customers and payments. Sensitive modifications are queued for managerial approval.
* **👁️ Viewer / Auditor:** Read-only compliance access across all financial ledgers.

### 🛡️ Secure Approval Workflow
To guarantee ledger integrity, actions initiated by restricted roles (e.g., adding customers, deleting payments, closing loans) are submitted to a **Pending Approvals** queue. Admins and Managers review and approve or reject changes before they are committed to Firestore.

### 📖 Customer Self-Service Portal
A standalone passbook interface allows end-customers to securely track their payment history, total loans, and remaining balance using their unique **Organization ID** and **Customer ID**.

### 🔒 Native Android & Biometric Security
* Integrated with **Capacitor 8** for native Android deployment (`.apk`).
* Touch ID / Face ID biometric authentication support powered by `@capgo/capacitor-native-biometric`.

### 📊 Dashboard & Financial Analytics
* Real-time metrics for total capital, daily collections, pending dues, and active loans.
* Visual analytics powered by **Chart.js**.
* Automated identification and reporting of top defaulters based on payment velocity.

### 🌐 Multi-Language Typography
Native typography support for multi-regional deployment, including **Devanagari** and **Kannada** font families alongside standard Inter typography.

---

## 🛠️ Technology Stack

| Category | Technology |
| :--- | :--- |
| **Frontend UI** | HTML5, CSS3 (Custom Variables & Modern Glassmorphism), Vanilla JavaScript (ES6+) |
| **Local Storage** | IndexedDB (Browser Native API) |
| **Cloud Backend** | Firebase Firestore (Realtime DB), Firebase Authentication |
| **Mobile Runtime** | Capacitor Core v8, Capacitor Android |
| **Native Plugins** | Native Biometric Auth, App, Filesystem, Share |
| **Data Viz** | Chart.js |

---

## 📁 Repository Structure

```text
Finance/
├── index.html                   # Core web application markup & onboarding screens
├── styles.css                   # Global styling system, dark mode, responsive layouts
├── app.js                       # Primary application state, IndexedDB engine & offline sync
├── sync.js                      # Firebase Auth state controller & mode switching logic
├── org.js                       # Organization mode Firestore listeners & multi-user sync
├── permissions.js               # Centralized RBAC matrix and authorization rules
├── customer-portal.js           # Self-service customer passbook verification logic
├── audit.js                     # Activity logging and audit trail system
├── firebase-config.example.js   # Firebase setup template (copy to firebase-config.js)
├── firestore.rules              # Firebase Security Rules for database protection
├── manifest.json                # Web App Manifest for PWA installation
├── capacitor.config.json        # Native mobile build configuration
├── scripts/
│   ├── serve.js                 # Lightweight Node.js local development server
│   └── sync-web.js              # Build script to copy web assets to dist directory (`www`)
└── android/                     # Native Android project directory (Gradle project)
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v16.0.0 or higher) & **npm**
* **Firebase Project** with Firestore and Authentication enabled
* **Android Studio & SDK** (Only required for building Android APKs)

---

### 💻 Web Development Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Finance
   ```

2. **Configure Firebase:**
   Copy the example template and fill in your Firebase credentials:
   ```bash
   cp firebase-config.example.js firebase-config.js
   ```
   *Edit `firebase-config.js` with your Firebase Console credentials (`apiKey`, `projectId`, `authDomain`, etc.).*

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Run Development Server:**
   ```bash
   npm run web
   ```
   Open your browser at **`http://localhost:8080`**.

---

### 📱 Android Application Setup (Capacitor)

1. **Synchronize Web Assets:**
   ```bash
   npm run android:sync
   ```

2. **Open in Android Studio:**
   ```bash
   npm run android:open
   ```

3. **Build Debug APK via CLI:**
   ```bash
   npm run android:build
   ```
   The compiled APK will be located at:
   `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 📜 NPM Scripts Reference

| Command | Description |
| :--- | :--- |
| `npm run web` | Launches the local Node.js web server (`scripts/serve.js`) |
| `npm run sync:web` | Bundles and syncs web root assets to the `www/` directory |
| `npm run android:add` | Initializes the Capacitor Android platform directory |
| `npm run android:sync` | Syncs web assets and updates Capacitor Android plugins |
| `npm run android:open` | Opens the native Android project in Android Studio |
| `npm run android:build` | Compiles the Android project into a debug APK (`app-debug.apk`) |

---

## 🔒 Database Security

Ensure your Firestore database rules are configured using `firestore.rules`. Key rules include:
* **Customers & Payments:** Read access granted to organization members; write access guarded by role permissions and approval requirements.
* **Customer Passbook Public Lookup:** Read-only access enabled for passbook lookups matching specific `orgId` and `customerId`.

---

## 📄 License

This project is private software licensed under the **ISC License**.

