package com.sams.controller;

import com.sams.dto.AssetInfoAuditDTO;
import com.sams.service.AssetInfoAuditService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/asset-info-audits")
@RequiredArgsConstructor
public class AssetInfoAuditController {

    private final AssetInfoAuditService service;

    @PostMapping
    public ResponseEntity<AssetInfoAuditDTO> create(@RequestBody AssetInfoAuditDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetInfoAuditDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetInfoAuditDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetInfoAuditDTO> update(@PathVariable Long id, @RequestBody AssetInfoAuditDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("AssetInfoAudit deleted successfully!.");
    }
}