package com.sams.controller;

import com.sams.dto.AssetCategoryDTO;
import com.sams.service.AssetCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-asset-categories")
@RequiredArgsConstructor
public class AssetCategoryController {

    private final AssetCategoryService service;

    @PostMapping
    public ResponseEntity<AssetCategoryDTO> create(@RequestBody AssetCategoryDTO dto) {
        return new ResponseEntity<>(service.createAssetCategory(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetCategoryDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAssetCategoryById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetCategoryDTO>> getAll() {
        return ResponseEntity.ok(service.getAllAssetCategories());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetCategoryDTO> update(@PathVariable Long id, @RequestBody AssetCategoryDTO dto) {
        return ResponseEntity.ok(service.updateAssetCategory(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteAssetCategory(id);
        return ResponseEntity.ok("AssetCategory deleted successfully!.");
    }
}