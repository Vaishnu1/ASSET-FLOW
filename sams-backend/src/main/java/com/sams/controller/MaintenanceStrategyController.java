package com.sams.controller;

import com.sams.dto.MaintenanceStrategyDTO;
import com.sams.service.MaintenanceStrategyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-maintenance-strategies")
@RequiredArgsConstructor
public class MaintenanceStrategyController {

    private final MaintenanceStrategyService service;

    @PostMapping
    public ResponseEntity<MaintenanceStrategyDTO> create(@RequestBody MaintenanceStrategyDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MaintenanceStrategyDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<MaintenanceStrategyDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<MaintenanceStrategyDTO> update(@PathVariable Long id, @RequestBody MaintenanceStrategyDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("MaintenanceStrategy deleted successfully!.");
    }
}