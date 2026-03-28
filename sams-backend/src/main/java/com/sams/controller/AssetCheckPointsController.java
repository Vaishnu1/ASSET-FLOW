package com.sams.controller;

import com.sams.dto.AssetCheckPointsDTO;
import com.sams.service.AssetCheckPointsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/asset-check-pointses")
@RequiredArgsConstructor
public class AssetCheckPointsController {

    private final AssetCheckPointsService service;

    @PostMapping
    public ResponseEntity<AssetCheckPointsDTO> create(@RequestBody AssetCheckPointsDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetCheckPointsDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetCheckPointsDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetCheckPointsDTO> update(@PathVariable Long id, @RequestBody AssetCheckPointsDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("AssetCheckPoints deleted successfully!.");
    }
}