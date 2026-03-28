package com.sams.controller;

import com.sams.dto.AssetAssigneeAuditDTO;
import com.sams.service.AssetAssigneeAuditService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/asset-assignee-audits")
@RequiredArgsConstructor
public class AssetAssigneeAuditController {

    private final AssetAssigneeAuditService service;

    @PostMapping
    public ResponseEntity<AssetAssigneeAuditDTO> create(@RequestBody AssetAssigneeAuditDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetAssigneeAuditDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetAssigneeAuditDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetAssigneeAuditDTO> update(@PathVariable Long id, @RequestBody AssetAssigneeAuditDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("AssetAssigneeAudit deleted successfully!.");
    }
}