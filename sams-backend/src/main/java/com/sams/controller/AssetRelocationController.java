package com.sams.controller;

import com.sams.dto.AssetRelocationDTO;
import com.sams.service.AssetRelocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-asset-relocations")
@RequiredArgsConstructor
public class AssetRelocationController {

    private final AssetRelocationService service;

    @PostMapping
    public ResponseEntity<AssetRelocationDTO> create(@RequestBody AssetRelocationDTO dto) {
        return new ResponseEntity<>(service.createAssetRelocation(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetRelocationDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAssetRelocationById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetRelocationDTO>> getAll() {
        return ResponseEntity.ok(service.getAllAssetRelocations());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetRelocationDTO> update(@PathVariable Long id, @RequestBody AssetRelocationDTO dto) {
        return ResponseEntity.ok(service.updateAssetRelocation(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteAssetRelocation(id);
        return ResponseEntity.ok("AssetRelocation deleted successfully!.");
    }
}