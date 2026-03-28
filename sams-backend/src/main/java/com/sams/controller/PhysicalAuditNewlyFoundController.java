package com.sams.controller;

import com.sams.dto.PhysicalAuditNewlyFoundDTO;
import com.sams.service.PhysicalAuditNewlyFoundService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/physical-audit-newly-founds")
@RequiredArgsConstructor
public class PhysicalAuditNewlyFoundController {

    private final PhysicalAuditNewlyFoundService service;

    @PostMapping
    public ResponseEntity<PhysicalAuditNewlyFoundDTO> create(@RequestBody PhysicalAuditNewlyFoundDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PhysicalAuditNewlyFoundDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PhysicalAuditNewlyFoundDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PhysicalAuditNewlyFoundDTO> update(@PathVariable Long id, @RequestBody PhysicalAuditNewlyFoundDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("PhysicalAuditNewlyFound deleted successfully!.");
    }
}