package com.sams.controller;

import com.sams.dto.AssetAssigneeDTO;
import com.sams.service.AssetAssigneeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-asset-assignees")
@RequiredArgsConstructor
public class AssetAssigneeController {

    private final AssetAssigneeService service;

    @PostMapping
    public ResponseEntity<AssetAssigneeDTO> create(@RequestBody AssetAssigneeDTO dto) {
        return new ResponseEntity<>(service.createAssetAssignee(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetAssigneeDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAssetAssigneeById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetAssigneeDTO>> getAll() {
        return ResponseEntity.ok(service.getAllAssetAssignees());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetAssigneeDTO> update(@PathVariable Long id, @RequestBody AssetAssigneeDTO dto) {
        return ResponseEntity.ok(service.updateAssetAssignee(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteAssetAssignee(id);
        return ResponseEntity.ok("AssetAssignee deleted successfully!.");
    }
}