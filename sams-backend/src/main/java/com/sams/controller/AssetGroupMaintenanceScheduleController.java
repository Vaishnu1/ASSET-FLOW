package com.sams.controller;

import com.sams.dto.AssetGroupMaintenanceScheduleDTO;
import com.sams.service.AssetGroupMaintenanceScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-asset-group-maintenance-schedules")
@RequiredArgsConstructor
public class AssetGroupMaintenanceScheduleController {

    private final AssetGroupMaintenanceScheduleService service;

    @PostMapping
    public ResponseEntity<AssetGroupMaintenanceScheduleDTO> create(@RequestBody AssetGroupMaintenanceScheduleDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetGroupMaintenanceScheduleDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetGroupMaintenanceScheduleDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetGroupMaintenanceScheduleDTO> update(@PathVariable Long id, @RequestBody AssetGroupMaintenanceScheduleDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("AssetGroupMaintenanceSchedule deleted successfully!.");
    }
}