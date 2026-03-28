package com.sams.controller;

import com.sams.dto.AssetInventoryDTO;
import com.sams.service.AssetInventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/asset-inventories")
@RequiredArgsConstructor
public class AssetInventoryController {

    private final AssetInventoryService service;

    @PostMapping
    public ResponseEntity<AssetInventoryDTO> create(@RequestBody AssetInventoryDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetInventoryDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetInventoryDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetInventoryDTO> update(@PathVariable Long id, @RequestBody AssetInventoryDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("AssetInventory deleted successfully!.");
    }
}