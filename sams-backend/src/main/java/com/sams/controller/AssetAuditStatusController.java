package com.sams.controller;

import com.sams.dto.AssetAuditStatusDTO;
import com.sams.service.AssetAuditStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/asset-audit-statuses")
@RequiredArgsConstructor
public class AssetAuditStatusController {

    private final AssetAuditStatusService service;

    @PostMapping
    public ResponseEntity<AssetAuditStatusDTO> create(@RequestBody AssetAuditStatusDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetAuditStatusDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetAuditStatusDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetAuditStatusDTO> update(@PathVariable Long id, @RequestBody AssetAuditStatusDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("AssetAuditStatus deleted successfully!.");
    }
}