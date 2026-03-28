package com.sams.controller;

import com.sams.dto.AssetTypeDTO;
import com.sams.service.AssetTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-asset-types")
@RequiredArgsConstructor
public class AssetTypeController {

    private final AssetTypeService service;

    @PostMapping
    public ResponseEntity<AssetTypeDTO> create(@RequestBody AssetTypeDTO dto) {
        return new ResponseEntity<>(service.createAssetType(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetTypeDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAssetTypeById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetTypeDTO>> getAll() {
        return ResponseEntity.ok(service.getAllAssetTypes());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetTypeDTO> update(@PathVariable Long id, @RequestBody AssetTypeDTO dto) {
        return ResponseEntity.ok(service.updateAssetType(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteAssetType(id);
        return ResponseEntity.ok("AssetType deleted successfully!.");
    }
}