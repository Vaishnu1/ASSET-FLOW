package com.sams.controller;

import com.sams.dto.PhysicalAuditVerificationDTO;
import com.sams.service.PhysicalAuditVerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/physical-audit-verifications")
@RequiredArgsConstructor
public class PhysicalAuditVerificationController {

    private final PhysicalAuditVerificationService service;

    @PostMapping
    public ResponseEntity<PhysicalAuditVerificationDTO> create(@RequestBody PhysicalAuditVerificationDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PhysicalAuditVerificationDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PhysicalAuditVerificationDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PhysicalAuditVerificationDTO> update(@PathVariable Long id, @RequestBody PhysicalAuditVerificationDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("PhysicalAuditVerification deleted successfully!.");
    }
}