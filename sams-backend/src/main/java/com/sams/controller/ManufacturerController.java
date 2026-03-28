package com.sams.controller;

import com.sams.dto.ManufacturerDTO;
import com.sams.service.ManufacturerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-manufacturers")
@RequiredArgsConstructor
public class ManufacturerController {

    private final ManufacturerService service;

    @PostMapping
    public ResponseEntity<ManufacturerDTO> create(@RequestBody ManufacturerDTO dto) {
        return new ResponseEntity<>(service.createManufacturer(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ManufacturerDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getManufacturerById(id));
    }

    @GetMapping
    public ResponseEntity<List<ManufacturerDTO>> getAll() {
        return ResponseEntity.ok(service.getAllManufacturers());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ManufacturerDTO> update(@PathVariable Long id, @RequestBody ManufacturerDTO dto) {
        return ResponseEntity.ok(service.updateManufacturer(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteManufacturer(id);
        return ResponseEntity.ok("Manufacturer deleted successfully!.");
    }
}