package com.sams.controller;

import com.sams.dto.PhysicalAuditDtlDTO;
import com.sams.service.PhysicalAuditDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/physical-audit-dtls")
@RequiredArgsConstructor
public class PhysicalAuditDtlController {

    private final PhysicalAuditDtlService service;

    @PostMapping
    public ResponseEntity<PhysicalAuditDtlDTO> create(@RequestBody PhysicalAuditDtlDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PhysicalAuditDtlDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PhysicalAuditDtlDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PhysicalAuditDtlDTO> update(@PathVariable Long id, @RequestBody PhysicalAuditDtlDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("PhysicalAuditDtl deleted successfully!.");
    }
}