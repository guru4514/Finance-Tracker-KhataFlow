const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'www');

// List of all web assets required by index.html and the app
const files = [
  'index.html',
  'app.html',
  '_redirects',
  'styles.css',
  'app.js',
  'sync.js',
  'org.js',
  'permissions.js',
  'audit.js',
  'customer-portal.js',
  'firebase-config.js',
  'sw.js',
  'manifest.json'
];

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

let syncedCount = 0;
for (const file of files) {
  const src = path.join(root, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(outDir, file));
    syncedCount++;
  } else {
    console.warn(`Warning: Web asset file ${file} does not exist at root.`);
  }
}

console.log(`Synced ${syncedCount} web files to ${path.relative(root, outDir)}`);
