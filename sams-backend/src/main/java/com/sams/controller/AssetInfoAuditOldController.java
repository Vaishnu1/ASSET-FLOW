package com.sams.controller;

import com.sams.dto.AssetInfoAuditOldDTO;
import com.sams.service.AssetInfoAuditOldService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/asset-info-audit-olds")
@RequiredArgsConstructor
public class AssetInfoAuditOldController {

    private final AssetInfoAuditOldService service;

    @PostMapping
    public ResponseEntity<AssetInfoAuditOldDTO> create(@RequestBody AssetInfoAuditOldDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetInfoAuditOldDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetInfoAuditOldDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetInfoAuditOldDTO> update(@PathVariable Long id, @RequestBody AssetInfoAuditOldDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("AssetInfoAuditOld deleted successfully!.");
    }
}