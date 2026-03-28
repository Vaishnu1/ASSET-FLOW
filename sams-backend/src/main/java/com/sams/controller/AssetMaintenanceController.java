package com.sams.controller;

import com.sams.dto.AssetMaintenanceDTO;
import com.sams.service.AssetMaintenanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/asset-maintenances")
@RequiredArgsConstructor
public class AssetMaintenanceController {

    private final AssetMaintenanceService service;

    @PostMapping
    public ResponseEntity<AssetMaintenanceDTO> create(@RequestBody AssetMaintenanceDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetMaintenanceDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetMaintenanceDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetMaintenanceDTO> update(@PathVariable Long id, @RequestBody AssetMaintenanceDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("AssetMaintenance deleted successfully!.");
    }
}