const fs = require('fs');
const path = require('path');

const controllersDir = path.join(__dirname, 'sams-backend', 'src', 'main', 'java', 'com', 'sams', 'controller');
const servicesFile = path.join(__dirname, 'SAMSUI', 'src', 'app', 'Constants', 'AssetOptimaServices.ts');

let endpointMap = {}; // ClassName -> endpoint 
if (fs.existsSync(controllersDir)) {
    fs.readdirSync(controllersDir).forEach(file => {
        if (!file.endsWith('Controller.java')) return;
        let content = fs.readFileSync(path.join(controllersDir, file), 'utf-8');
        let classMatch = content.match(/public class (\w+)Controller/);
        let reqMatch = content.match(/@RequestMapping\("([^"]+)"\)/);
        if (classMatch && reqMatch) {
            endpointMap[classMatch[1]] = reqMatch[1].substring(1); // remove leading slash
        }
    });
}

function getEntityNameFromService(varName) {
    let name = varName.replace(/^(saveOrUpdate|save|saveUpdate|fetchListOfAll|fetchListOf|listOfAll|listAll|listOf|fetch|load|delete|generate|get)/, '');
    name = name.replace(/(Combo|Dtl|Info|Report|By[A-Za-z]+|History)$/, '');
    if (!name) name = varName;
    return name;
}

// Special mappings based on common Angular service variables vs Java Entity models
const specialMappings = {
    'Organisation': 'Org',
    'Deparment': 'Department', // typo in angular
    'User': 'User',
    'CatCustField': 'CategoryCustomFields',
    'SuppEmp': 'Employee',
    'ChildAsset': 'ChildAsset',
    'AssetCat': 'AssetCategory',
    'Partner': 'BusinessPartner',
    'PurchaseReq': 'PurchaseRequest'
};

let content = fs.readFileSync(servicesFile, 'utf-8');

content = content.replace(/readonly\s+([a-zA-Z0-9_]+)\s*:\s*string\s*=\s*'([^']+)\.sams';/g, (match, varName, samsName) => {
    let entity = getEntityNameFromService(varName);

    // Apply special mappings if they exist
    for (const [key, val] of Object.entries(specialMappings)) {
        if (entity.includes(key) || varName.includes(key)) {
            entity = val;
            break;
        }
    }

    let endpoint = endpointMap[entity];
    
    // Fallback: If no exact key, find longest matching key
    if (!endpoint) {
        let bestKey = '';
        Object.keys(endpointMap).forEach(k => {
            if (varName.toLowerCase().includes(k.toLowerCase()) && k.length > bestKey.length) {
                bestKey = k;
            }
        });
        if (bestKey) {
            endpoint = endpointMap[bestKey];
        } else {
            // Ultimate fallback (just to satisfy TS syntax)
            endpoint = 'api/v1/' + entity.toLowerCase();
        }
    }

    return `readonly ${varName}: string = '${endpoint}';`;
});

fs.writeFileSync(servicesFile, content, 'utf-8');
console.log('Services mapped successfully!');
