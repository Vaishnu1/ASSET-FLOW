package com.sams.controller;

import com.sams.dto.AssetGroupDTO;
import com.sams.service.AssetGroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-asset-groups")
@RequiredArgsConstructor
public class AssetGroupController {

    private final AssetGroupService service;

    @PostMapping
    public ResponseEntity<AssetGroupDTO> create(@RequestBody AssetGroupDTO dto) {
        return new ResponseEntity<>(service.createAssetGroup(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetGroupDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAssetGroupById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetGroupDTO>> getAll() {
        return ResponseEntity.ok(service.getAllAssetGroups());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetGroupDTO> update(@PathVariable Long id, @RequestBody AssetGroupDTO dto) {
        return ResponseEntity.ok(service.updateAssetGroup(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteAssetGroup(id);
        return ResponseEntity.ok("AssetGroup deleted successfully!.");
    }
}