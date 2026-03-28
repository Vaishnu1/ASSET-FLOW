package com.sams.controller;

import com.sams.dto.AssetRelocateDTO;
import com.sams.service.AssetRelocateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/asset-relocates")
@RequiredArgsConstructor
public class AssetRelocateController {

    private final AssetRelocateService service;

    @PostMapping
    public ResponseEntity<AssetRelocateDTO> create(@RequestBody AssetRelocateDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetRelocateDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetRelocateDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetRelocateDTO> update(@PathVariable Long id, @RequestBody AssetRelocateDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("AssetRelocate deleted successfully!.");
    }
}