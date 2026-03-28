package com.sams.controller;

import com.sams.dto.AssetSubCategoryDTO;
import com.sams.service.AssetSubCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-asset-sub-categories")
@RequiredArgsConstructor
public class AssetSubCategoryController {

    private final AssetSubCategoryService service;

    @PostMapping
    public ResponseEntity<AssetSubCategoryDTO> create(@RequestBody AssetSubCategoryDTO dto) {
        return new ResponseEntity<>(service.createAssetSubCategory(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetSubCategoryDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAssetSubCategoryById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetSubCategoryDTO>> getAll() {
        return ResponseEntity.ok(service.getAllAssetSubCategories());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetSubCategoryDTO> update(@PathVariable Long id, @RequestBody AssetSubCategoryDTO dto) {
        return ResponseEntity.ok(service.updateAssetSubCategory(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteAssetSubCategory(id);
        return ResponseEntity.ok("AssetSubCategory deleted successfully!.");
    }
}