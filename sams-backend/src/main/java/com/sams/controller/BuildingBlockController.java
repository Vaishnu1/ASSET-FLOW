package com.sams.controller;

import com.sams.dto.BuildingBlockDTO;
import com.sams.service.BuildingBlockService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-building-blocks")
@RequiredArgsConstructor
public class BuildingBlockController {

    private final BuildingBlockService service;

    @PostMapping
    public ResponseEntity<BuildingBlockDTO> create(@RequestBody BuildingBlockDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BuildingBlockDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<BuildingBlockDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BuildingBlockDTO> update(@PathVariable Long id, @RequestBody BuildingBlockDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("BuildingBlock deleted successfully!.");
    }
}