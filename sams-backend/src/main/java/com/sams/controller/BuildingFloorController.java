package com.sams.controller;

import com.sams.dto.BuildingFloorDTO;
import com.sams.service.BuildingFloorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-building-floors")
@RequiredArgsConstructor
public class BuildingFloorController {

    private final BuildingFloorService service;

    @PostMapping
    public ResponseEntity<BuildingFloorDTO> create(@RequestBody BuildingFloorDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BuildingFloorDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<BuildingFloorDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BuildingFloorDTO> update(@PathVariable Long id, @RequestBody BuildingFloorDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("BuildingFloor deleted successfully!.");
    }
}