const fs = require('fs');
const path = require('path');

const sqlFile = path.join(__dirname, 'SAMSUI', 'DB', 'DB-AO', 'DB-AO.sql');
const content = fs.readFileSync(sqlFile, 'utf-8');

const tableRegex = /CREATE\s+TABLE\s+([a-zA-Z0-9_\.]+)\s*\(/g;
let match;
const tables = new Set();
while ((match = tableRegex.exec(content)) !== null) {
    let tableName = match[1];
    tables.add(tableName);
}

const entityDir = path.join(__dirname, 'sams-backend', 'src', 'main', 'java', 'com', 'sams', 'entity');
const generatedFiles = fs.existsSync(entityDir) ? fs.readdirSync(entityDir).filter(f => f.endsWith('.java')) : [];
const generatedEntities = generatedFiles.map(f => f.slice(0, -5));

let out = '--- TABLES IN DB ---\n';
out += Array.from(tables).join('\n') + '\n';
out += '--- GENERATED ENTITIES ---\n';
out += generatedEntities.join('\n') + '\n';

fs.writeFileSync(path.join(__dirname, 'tables.utf8.txt'), out, 'utf-8');
