const fs = require('fs');
const path = require('path');

const DIRS = [
  'C:\\Users\\Lakshitha\\Downloads\\SAMSUI\\SAMSUI\\src',
  'C:\\Users\\Lakshitha\\Downloads\\SAMSUI\\sams-backend'
];

const EXTENSIONS = ['.ts', '.html', '.scss', '.css', '.xml', '.json', '.md', '.java', '.yaml', '.yml', '.properties'];

const REPLACEMENTS = [
  { from: /AssetFlow/g, to: 'AssetOptima' },
  { from: /assetFlow/g, to: 'assetOptima' },
  { from: /asset-flow/g, to: 'asset-optima' },
  { from: /Asset Flow/g, to: 'Asset Optima' }
];

function processPath(targetPath) {
  if (targetPath.includes('node_modules') || targetPath.includes('.git') || targetPath.includes('dist') || targetPath.includes('target')) {
    return;
  }
  
  const stats = fs.statSync(targetPath);
  if (stats.isDirectory()) {
    const files = fs.readdirSync(targetPath);
    for (const file of files) {
      processPath(path.join(targetPath, file));
    }
  } else if (stats.isFile()) {
    const ext = path.extname(targetPath).toLowerCase();
    if (EXTENSIONS.includes(ext) || path.basename(targetPath) === 'pom.xml') {
      let content = fs.readFileSync(targetPath, 'utf8');
      let newContent = content;
      
      for (const {from, to} of REPLACEMENTS) {
        newContent = newContent.replace(from, to);
      }
      
      if (content !== newContent) {
        fs.writeFileSync(targetPath, newContent, 'utf8');
        console.log(`Updated: ${targetPath}`);
      }
    }
  }
}

for (const dir of DIRS) {
  if (fs.existsSync(dir)) {
    processPath(dir);
  } else {
    console.log(`Path not found: ${dir}`);
  }
}

// Special case: SAMSUI pom.xml and angular.json, package.json
const extraFiles = [
  'C:\\Users\\Lakshitha\\Downloads\\SAMSUI\\SAMSUI\\package.json',
  'C:\\Users\\Lakshitha\\Downloads\\SAMSUI\\SAMSUI\\angular.json'
];

for (const file of extraFiles) {
  if (fs.existsSync(file)) {
    processPath(file);
  }
}
