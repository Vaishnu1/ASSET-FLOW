package com.sams.controller;

import com.sams.dto.InventoryAuditDTO;
import com.sams.service.InventoryAuditService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/inventory-audits")
@RequiredArgsConstructor
public class InventoryAuditController {

    private final InventoryAuditService service;

    @PostMapping
    public ResponseEntity<InventoryAuditDTO> create(@RequestBody InventoryAuditDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InventoryAuditDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<InventoryAuditDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<InventoryAuditDTO> update(@PathVariable Long id, @RequestBody InventoryAuditDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("InventoryAudit deleted successfully!.");
    }
}