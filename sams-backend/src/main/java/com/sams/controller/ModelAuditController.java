package com.sams.controller;

import com.sams.dto.ModelAuditDTO;
import com.sams.service.ModelAuditService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-model-audits")
@RequiredArgsConstructor
public class ModelAuditController {

    private final ModelAuditService service;

    @PostMapping
    public ResponseEntity<ModelAuditDTO> create(@RequestBody ModelAuditDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ModelAuditDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ModelAuditDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ModelAuditDTO> update(@PathVariable Long id, @RequestBody ModelAuditDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("ModelAudit deleted successfully!.");
    }
}