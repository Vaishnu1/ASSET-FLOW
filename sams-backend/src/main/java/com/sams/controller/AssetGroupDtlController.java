package com.sams.controller;

import com.sams.dto.AssetGroupDtlDTO;
import com.sams.service.AssetGroupDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-asset-group-dtls")
@RequiredArgsConstructor
public class AssetGroupDtlController {

    private final AssetGroupDtlService service;

    @PostMapping
    public ResponseEntity<AssetGroupDtlDTO> create(@RequestBody AssetGroupDtlDTO dto) {
        return new ResponseEntity<>(service.createAssetGroupDtl(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetGroupDtlDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAssetGroupDtlById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetGroupDtlDTO>> getAll() {
        return ResponseEntity.ok(service.getAllAssetGroupDtls());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetGroupDtlDTO> update(@PathVariable Long id, @RequestBody AssetGroupDtlDTO dto) {
        return ResponseEntity.ok(service.updateAssetGroupDtl(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteAssetGroupDtl(id);
        return ResponseEntity.ok("AssetGroupDtl deleted successfully!.");
    }
}