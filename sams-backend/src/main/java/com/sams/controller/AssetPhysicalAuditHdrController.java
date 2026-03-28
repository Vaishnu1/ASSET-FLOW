package com.sams.controller;

import com.sams.dto.AssetPhysicalAuditHdrDTO;
import com.sams.service.AssetPhysicalAuditHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/asset-physical-audit-hdrs")
@RequiredArgsConstructor
public class AssetPhysicalAuditHdrController {

    private final AssetPhysicalAuditHdrService service;

    @PostMapping
    public ResponseEntity<AssetPhysicalAuditHdrDTO> create(@RequestBody AssetPhysicalAuditHdrDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetPhysicalAuditHdrDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetPhysicalAuditHdrDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetPhysicalAuditHdrDTO> update(@PathVariable Long id, @RequestBody AssetPhysicalAuditHdrDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("AssetPhysicalAuditHdr deleted successfully!.");
    }
}