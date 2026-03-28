package com.sams.controller;

import com.sams.dto.AssetGroupCheckPointsDTO;
import com.sams.service.AssetGroupCheckPointsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/asset-group-check-pointses")
@RequiredArgsConstructor
public class AssetGroupCheckPointsController {

    private final AssetGroupCheckPointsService service;

    @PostMapping
    public ResponseEntity<AssetGroupCheckPointsDTO> create(@RequestBody AssetGroupCheckPointsDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetGroupCheckPointsDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetGroupCheckPointsDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetGroupCheckPointsDTO> update(@PathVariable Long id, @RequestBody AssetGroupCheckPointsDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("AssetGroupCheckPoints deleted successfully!.");
    }
}