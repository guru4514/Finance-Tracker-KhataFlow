# Pigmie Record Management System

Pigmie is a comprehensive financial record and collection management application designed for agents and organizations to track daily customer collections, manage payments, and maintain detailed audit logs. It features a responsive web interface and is packaged for Android using Capacitor.

## Features

### Two Operating Modes
- **Personal Mode (Offline-First):** Designed for individual agents. Data is stored locally in the browser using IndexedDB, allowing the app to work entirely offline without latency. Users can manually or automatically sync their local data to the cloud (Firebase) as a backup.
- **Organization Mode (Live Cloud Sync):** Designed for teams. Connects directly to a real-time Firebase Firestore database. All actions are synchronized instantly across all organization members without relying on local caching, preventing data collisions.

### Role-Based Access Control (RBAC)
When operating in Organization Mode, members are assigned specific roles that govern their permissions:
- **Owner / Admin:** Full control over the organization. Can create the organization, invite members, approve/reject pending member requests, and approve/reject data changes.
- **Manager:** Can view records for the entire organization and manage lower-tier staff.
- **Agent / Collector:** Restricted access. Can only view the customers and payments they are explicitly assigned to or have collected. Cannot freely delete or modify records without approval.
- **Viewer / Auditor:** Read-only access to organization records for auditing purposes. Cannot modify any data.

### Approval Workflow
To prevent unauthorized or accidental modifications in Organization Mode, restricted roles (Agents/Collectors) cannot directly edit the live database. Instead, they submit requests for:
- Adding a new customer
- Editing an existing customer
- Deleting a customer
- Deleting a payment

These requests enter a **Pending Approvals** queue visible only to Admins and Managers, who can review and either approve or reject the changes. Approved changes are then automatically merged into the live organization database.

### Core Tracking
- **Customers:** Track customer details, contact information, status (Active/Completed/Defaulted), and their expected daily collection amount.
- **Payments:** Log daily payments against specific customers, including the date, amount, and the agent who collected it.
- **Dashboard:** Provides an overview of total capital, total collections, pending collections, and a list of top defaulters based on their payment history.

## Technology Stack
- **Frontend:** Pure HTML5, CSS3, and Vanilla JavaScript (No heavy frameworks).
- **Backend / Database:** Firebase Authentication (Email/Password) and Firebase Firestore (NoSQL Cloud Database).
- **Local Storage:** IndexedDB for robust offline data persistence.
- **Mobile Packaging:** Capacitor by Ionic, enabling the web app to be compiled natively into an Android APK (`app-debug.apk`).

## Setup and Installation

### Prerequisites
- Node.js and npm installed
- Android Studio (if building the Android APK)
- A Firebase project with Authentication and Firestore enabled

### Web Development
1. Clone the repository.
2. Ensure your Firebase configuration keys are placed correctly in `app.js`.
3. Start a local web server to serve the directory:
   ```bash
   node scripts/serve.js
   ```
4. Access the app in your browser at `http://localhost:8080`.

### Android Build (Capacitor)
To build the Android application:
1. Install dependencies (if any).
2. Sync the web assets with the Android project:
   ```bash
   npx cap sync android
   ```
3. Open the project in Android Studio or build it via the command line:
   ```bash
   cd android
   ./gradlew assembleDebug
   ```
4. The generated APK will be located at `android/app/build/outputs/apk/debug/app-debug.apk`.

## File Structure Highlights
- `index.html`: The main entry point and UI structure.
- `index.css`: Application styling, responsive design, and CSS variables.
- `app.js`: Core application logic, IndexedDB handling, UI rendering, and Personal Mode syncing.
- `org.js`: Organization mode logic, real-time Firestore listeners, RBAC enforcement, and Approval workflows.
- `sync.js`: Firebase Authentication state management and mode selection (Personal vs. Organization).
- `audit.js`: (Optional) Logic for tracking detailed audit logs of all actions performed within an organization.
