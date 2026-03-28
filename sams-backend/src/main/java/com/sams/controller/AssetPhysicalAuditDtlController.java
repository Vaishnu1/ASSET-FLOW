package com.sams.controller;

import com.sams.dto.AssetPhysicalAuditDtlDTO;
import com.sams.service.AssetPhysicalAuditDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/asset-physical-audit-dtls")
@RequiredArgsConstructor
public class AssetPhysicalAuditDtlController {

    private final AssetPhysicalAuditDtlService service;

    @PostMapping
    public ResponseEntity<AssetPhysicalAuditDtlDTO> create(@RequestBody AssetPhysicalAuditDtlDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetPhysicalAuditDtlDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetPhysicalAuditDtlDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetPhysicalAuditDtlDTO> update(@PathVariable Long id, @RequestBody AssetPhysicalAuditDtlDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("AssetPhysicalAuditDtl deleted successfully!.");
    }
}