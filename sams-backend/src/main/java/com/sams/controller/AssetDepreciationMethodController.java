package com.sams.controller;

import com.sams.dto.AssetDepreciationMethodDTO;
import com.sams.service.AssetDepreciationMethodService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-asset-depreciation-methods")
@RequiredArgsConstructor
public class AssetDepreciationMethodController {

    private final AssetDepreciationMethodService service;

    @PostMapping
    public ResponseEntity<AssetDepreciationMethodDTO> create(@RequestBody AssetDepreciationMethodDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetDepreciationMethodDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetDepreciationMethodDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetDepreciationMethodDTO> update(@PathVariable Long id, @RequestBody AssetDepreciationMethodDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("AssetDepreciationMethod deleted successfully!.");
    }
}