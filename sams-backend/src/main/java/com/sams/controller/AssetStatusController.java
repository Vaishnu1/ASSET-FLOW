package com.sams.controller;

import com.sams.dto.AssetStatusDTO;
import com.sams.service.AssetStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-asset-statuses")
@RequiredArgsConstructor
public class AssetStatusController {

    private final AssetStatusService service;

    @PostMapping
    public ResponseEntity<AssetStatusDTO> create(@RequestBody AssetStatusDTO dto) {
        return new ResponseEntity<>(service.createAssetStatus(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetStatusDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAssetStatusById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetStatusDTO>> getAll() {
        return ResponseEntity.ok(service.getAllAssetStatuses());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetStatusDTO> update(@PathVariable Long id, @RequestBody AssetStatusDTO dto) {
        return ResponseEntity.ok(service.updateAssetStatus(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteAssetStatus(id);
        return ResponseEntity.ok("AssetStatus deleted successfully!.");
    }
}