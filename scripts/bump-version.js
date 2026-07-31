const fs = require('fs');
const path = require('path');

const SW_FILE = path.join(__dirname, '..', 'sw.js');
const HTML_FILES = [
    path.join(__dirname, '..', 'index.html'),
    path.join(__dirname, '..', 'app.html')
];

try {
    // 1. Read sw.js and find current version
    let swContent = fs.readFileSync(SW_FILE, 'utf8');
    const versionMatch = swContent.match(/CACHE_NAME = 'pigmie-cache-v(\d+)'/);
    
    if (!versionMatch) {
        throw new Error("Could not find version in sw.js");
    }
    
    const currentVersion = parseInt(versionMatch[1], 10);
    const newVersion = currentVersion + 1;
    
    console.log(`Bumping version: v${currentVersion} -> v${newVersion}`);
    
    // 2. Update sw.js
    const swRegex = new RegExp(`v=${currentVersion}`, 'g');
    swContent = swContent.replace(swRegex, `v=${newVersion}`);
    swContent = swContent.replace(`pigmie-cache-v${currentVersion}`, `pigmie-cache-v${newVersion}`);
    fs.writeFileSync(SW_FILE, swContent);
    console.log(`Updated sw.js`);
    
    // 3. Update HTML files
    HTML_FILES.forEach(file => {
        if (fs.existsSync(file)) {
            let htmlContent = fs.readFileSync(file, 'utf8');
            const htmlRegex = new RegExp(`\\?v=${currentVersion}`, 'g');
            htmlContent = htmlContent.replace(htmlRegex, `?v=${newVersion}`);
            fs.writeFileSync(file, htmlContent);
            console.log(`Updated ${path.basename(file)}`);
        }
    });
    
    console.log('\nSuccess! Version bump complete.');
} catch (error) {
    console.error("Error bumping version:", error);
    process.exit(1);
}
