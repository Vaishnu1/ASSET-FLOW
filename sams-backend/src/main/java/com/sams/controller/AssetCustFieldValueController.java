package com.sams.controller;

import com.sams.dto.AssetCustFieldValueDTO;
import com.sams.service.AssetCustFieldValueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-asset-cust-field-values")
@RequiredArgsConstructor
public class AssetCustFieldValueController {

    private final AssetCustFieldValueService service;

    @PostMapping
    public ResponseEntity<AssetCustFieldValueDTO> create(@RequestBody AssetCustFieldValueDTO dto) {
        return new ResponseEntity<>(service.createAssetCustFieldValue(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetCustFieldValueDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAssetCustFieldValueById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetCustFieldValueDTO>> getAll() {
        return ResponseEntity.ok(service.getAllAssetCustFieldValues());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetCustFieldValueDTO> update(@PathVariable Long id, @RequestBody AssetCustFieldValueDTO dto) {
        return ResponseEntity.ok(service.updateAssetCustFieldValue(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteAssetCustFieldValue(id);
        return ResponseEntity.ok("AssetCustFieldValue deleted successfully!.");
    }
}