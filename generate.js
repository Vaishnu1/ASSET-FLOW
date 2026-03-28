const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'SAMSUI', 'src', 'app', 'Model', 'master');
const basePackagePath = path.join(__dirname, 'sams-backend', 'src', 'main', 'java', 'com', 'sams');

const DIRS = {
    entity: path.join(basePackagePath, 'entity'),
    dto: path.join(basePackagePath, 'dto'),
    repository: path.join(basePackagePath, 'repository'),
    service: path.join(basePackagePath, 'service'),
    serviceImpl: path.join(basePackagePath, 'service', 'impl'),
    controller: path.join(basePackagePath, 'controller')
};

// Ensure directories exist
Object.values(DIRS).forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

function toCamelCase(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}

function toSnakeCase(str) {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

function mapType(tsType, fieldName) {
    tsType = tsType.trim().toLowerCase();
    if (tsType.includes('string')) return 'String';
    if (tsType.includes('number')) {
        if (fieldName.toLowerCase().includes('cost') || fieldName.toLowerCase().includes('price')) return 'Double';
        if (fieldName.toLowerCase().includes('id')) return 'Long';
        return 'Integer';
    }
    if (tsType.includes('boolean')) return 'Boolean';
    if (tsType.includes('date')) return 'LocalDateTime';
    return 'String'; // Default fallback
}

function pluralize(word) {
    if (word.endsWith('y')) return word.slice(0, -1) + 'ies';
    if (word.endsWith('s')) return word + 'es';
    return word + 's';
}

fs.readdirSync(modelsDir).forEach(file => {
    if (!file.endsWith('.ts')) return;
    if (['department.ts', 'employee.ts', 'asset.ts', 'customer.ts'].includes(file)) return; // Skip already created ones

    const content = fs.readFileSync(path.join(modelsDir, file), 'utf-8');
    const classMatch = content.match(/export class (\w+)(Model|)?\s*(extends .*?)?\{/);
    if (!classMatch) return;

    let baseClassName = classMatch[1];
    if (baseClassName.endsWith('Model')) {
        baseClassName = baseClassName.slice(0, -5);
    }
    if(!baseClassName || baseClassName.length === 0) return;

    const className = baseClassName;
    const varName = toCamelCase(className);

    const fields = [];
    const fieldRegex = /public\s+(\w+)\s*\??\s*:\s*([^;]+);/g;
    let match;
    while ((match = fieldRegex.exec(content)) !== null) {
        const fieldName = match[1];
        const tsType = match[2];
        const javaType = mapType(tsType, fieldName);
        
        // Skip some common base fields to avoid duplication or complications, except standard ones
        if (['pageNumber', 'recordsPerPage', 'isListEmpty', 'source', 'sourceScreen', 'reportType'].includes(fieldName)) continue;
        
        fields.push({ name: fieldName, type: javaType });
    }

    if (fields.length === 0) return; // Empty model

    // 1. Generate Entity
    let entityContent = `package com.sams.entity;\n\nimport jakarta.persistence.*;\nimport lombok.Data;\nimport lombok.NoArgsConstructor;\nimport lombok.AllArgsConstructor;\nimport java.time.LocalDateTime;\n\n@Entity\n@Table(name = "m_${toSnakeCase(className)}", schema = "master")\n@Data\n@NoArgsConstructor\n@AllArgsConstructor\npublic class ${className} {\n\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    @Column(name = "id")\n    private Long id;\n\n`;

    fields.forEach(f => {
        if (f.name.toLowerCase() === 'id') return; // Handled
        let ann = `    @Column(name = "${toSnakeCase(f.name)}")`;
        entityContent += `${ann}\n    private ${f.type} ${f.name};\n\n`;
    });

    entityContent += `    @PrePersist\n    protected void onCreate() {\n       // Auto-generated\n    }\n\n    @PreUpdate\n    protected void onUpdate() {\n       // Auto-generated\n    }\n}`;
    fs.writeFileSync(path.join(DIRS.entity, `${className}.java`), entityContent);

    // 2. Generate DTO
    let dtoContent = `package com.sams.dto;\n\nimport lombok.Data;\nimport lombok.NoArgsConstructor;\nimport java.time.LocalDateTime;\n\n@Data\n@NoArgsConstructor\npublic class ${className}DTO {\n    private Long id;\n`;
    fields.forEach(f => {
        if (f.name.toLowerCase() === 'id') return;
        dtoContent += `    private ${f.type} ${f.name};\n`;
    });
    dtoContent += `}`;
    fs.writeFileSync(path.join(DIRS.dto, `${className}DTO.java`), dtoContent);

    // 3. Generate Repository
    let repoContent = `package com.sams.repository;\n\nimport com.sams.entity.${className};\nimport org.springframework.data.jpa.repository.JpaRepository;\nimport org.springframework.stereotype.Repository;\n\n@Repository\npublic interface ${className}Repository extends JpaRepository<${className}, Long> {\n}`;
    fs.writeFileSync(path.join(DIRS.repository, `${className}Repository.java`), repoContent);

    // 4. Generate Service Interface
    let serviceContent = `package com.sams.service;\n\nimport com.sams.dto.${className}DTO;\nimport java.util.List;\n\npublic interface ${className}Service {\n    ${className}DTO create${className}(${className}DTO dto);\n    ${className}DTO get${className}ById(Long id);\n    List<${className}DTO> getAll${pluralize(className)}();\n    ${className}DTO update${className}(Long id, ${className}DTO dto);\n    void delete${className}(Long id);\n}`;
    fs.writeFileSync(path.join(DIRS.service, `${className}Service.java`), serviceContent);

    // 5. Generate ServiceImpl
    let serviceImplContent = `package com.sams.service.impl;\n\nimport com.sams.dto.${className}DTO;\nimport com.sams.entity.${className};\nimport com.sams.exception.ResourceNotFoundException;\nimport com.sams.repository.${className}Repository;\nimport com.sams.service.${className}Service;\nimport lombok.RequiredArgsConstructor;\nimport org.springframework.stereotype.Service;\nimport org.springframework.transaction.annotation.Transactional;\nimport java.util.List;\nimport java.util.stream.Collectors;\n\n@Service\n@RequiredArgsConstructor\npublic class ${className}ServiceImpl implements ${className}Service {\n\n    private final ${className}Repository repository;\n\n    @Override\n    @Transactional\n    public ${className}DTO create${className}(${className}DTO dto) {\n        ${className} entity = mapToEntity(dto);\n        return mapToDTO(repository.save(entity));\n    }\n\n    @Override\n    public ${className}DTO get${className}ById(Long id) {\n        ${className} entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("${className} not found with ID: " + id));\n        return mapToDTO(entity);\n    }\n\n    @Override\n    public List<${className}DTO> getAll${pluralize(className)}() {\n        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());\n    }\n\n    @Override\n    @Transactional\n    public ${className}DTO update${className}(Long id, ${className}DTO dto) {\n        ${className} entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("${className} not found with ID: " + id));\n        // Default quick update implementation (normally map fields here)\n        ${className} mapped = mapToEntity(dto);\n        mapped.setId(id);\n        return mapToDTO(repository.save(mapped));\n    }\n\n    @Override\n    @Transactional\n    public void delete${className}(Long id) {\n        ${className} entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("${className} not found with ID: " + id));\n        repository.delete(entity);\n    }\n\n    private ${className} mapToEntity(${className}DTO dto) {\n        ${className} entity = new ${className}();\n`;
    fields.forEach(f => {
        if (f.name.toLowerCase() === 'id') return;
        serviceImplContent += `        entity.set${f.name.charAt(0).toUpperCase() + f.name.slice(1)}(dto.get${f.name.charAt(0).toUpperCase() + f.name.slice(1)}());\n`;
    });
    serviceImplContent += `        return entity;\n    }\n\n    private ${className}DTO mapToDTO(${className} entity) {\n        ${className}DTO dto = new ${className}DTO();\n        dto.setId(entity.getId());\n`;
    fields.forEach(f => {
        if (f.name.toLowerCase() === 'id') return;
        serviceImplContent += `        dto.set${f.name.charAt(0).toUpperCase() + f.name.slice(1)}(entity.get${f.name.charAt(0).toUpperCase() + f.name.slice(1)}());\n`;
    });
    serviceImplContent += `        return dto;\n    }\n}`;
    fs.writeFileSync(path.join(DIRS.serviceImpl, `${className}ServiceImpl.java`), serviceImplContent);

    // 6. Generate Controller
    let endpoint = toSnakeCase(pluralize(className)).replace(/_/g, '-');
    let controllerContent = `package com.sams.controller;\n\nimport com.sams.dto.${className}DTO;\nimport com.sams.service.${className}Service;\nimport lombok.RequiredArgsConstructor;\nimport org.springframework.http.HttpStatus;\nimport org.springframework.http.ResponseEntity;\nimport org.springframework.web.bind.annotation.*;\nimport java.util.List;\n\n@RestController\n@RequestMapping("/api/v1/${endpoint}")\n@RequiredArgsConstructor\npublic class ${className}Controller {\n\n    private final ${className}Service service;\n\n    @PostMapping\n    public ResponseEntity<${className}DTO> create(@RequestBody ${className}DTO dto) {\n        return new ResponseEntity<>(service.create${className}(dto), HttpStatus.CREATED);\n    }\n\n    @GetMapping("/{id}")\n    public ResponseEntity<${className}DTO> getById(@PathVariable Long id) {\n        return ResponseEntity.ok(service.get${className}ById(id));\n    }\n\n    @GetMapping\n    public ResponseEntity<List<${className}DTO>> getAll() {\n        return ResponseEntity.ok(service.getAll${pluralize(className)}());\n    }\n\n    @PutMapping("/{id}")\n    public ResponseEntity<${className}DTO> update(@PathVariable Long id, @RequestBody ${className}DTO dto) {\n        return ResponseEntity.ok(service.update${className}(id, dto));\n    }\n\n    @DeleteMapping("/{id}")\n    public ResponseEntity<String> delete(@PathVariable Long id) {\n        service.delete${className}(id);\n        return ResponseEntity.ok("${className} deleted successfully!.");\n    }\n}`;
    fs.writeFileSync(path.join(DIRS.controller, `${className}Controller.java`), controllerContent);

    console.log(`Generated basic setup for ${className}`);
});
console.log('Code generation complete.');
