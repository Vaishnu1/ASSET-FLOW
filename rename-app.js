const fs = require('fs');
const path = require('path');

const targetDirs = [
    path.join(__dirname, 'SAMSUI', 'src'),
    path.join(__dirname, 'SAMSUI'),
    path.join(__dirname, 'sams-backend')
];

function replaceInFile(filePath) {
    // Only process text files
    if (filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.ico') || filePath.endsWith('.jar')) return;
    
    let original = fs.readFileSync(filePath, 'utf8');
    let replaced = original;
    
    // Exact text replacements
    replaced = replaced.replace(/AssetOptima/g, 'AssetFlow');
    replaced = replaced.replace(/assetOptima/g, 'assetFlow');
    replaced = replaced.replace(/Asset optima/gi, 'Asset Flow');
    replaced = replaced.replace(/Asset Optima/gi, 'AssetFlow');
    
    // Logo text replacement. Often in header.component.html or similar.
    // Replace text >AssetOptima< with >AF<
    replaced = replaced.replace(/>\s*Asset\s*Optima\s*</gi, '>AF<');
    replaced = replaced.replace(/>\s*AssetOptima\s*</gi, '>AF<');
    
    if (original !== replaced) {
        fs.writeFileSync(filePath, replaced, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

function processDirectory(dirToProcess) {
    if (!fs.existsSync(dirToProcess)) return;
    
    let entries = fs.readdirSync(dirToProcess, { withFileTypes: true });
    for (let entry of entries) {
        let fullPath = path.join(dirToProcess, entry.name);
        
        if (entry.isDirectory()) {
            if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === 'target' || entry.name === '.git') continue;
            processDirectory(fullPath);
        } else {
            replaceInFile(fullPath);
        }
    }
}

targetDirs.forEach(dir => processDirectory(dir));

console.log('Rebranding complete!');
