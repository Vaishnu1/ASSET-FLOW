package com.sams.controller;

import com.sams.dto.AssetAssigneeAuditOldDTO;
import com.sams.service.AssetAssigneeAuditOldService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/asset-assignee-audit-olds")
@RequiredArgsConstructor
public class AssetAssigneeAuditOldController {

    private final AssetAssigneeAuditOldService service;

    @PostMapping
    public ResponseEntity<AssetAssigneeAuditOldDTO> create(@RequestBody AssetAssigneeAuditOldDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetAssigneeAuditOldDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetAssigneeAuditOldDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetAssigneeAuditOldDTO> update(@PathVariable Long id, @RequestBody AssetAssigneeAuditOldDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("AssetAssigneeAuditOld deleted successfully!.");
    }
}