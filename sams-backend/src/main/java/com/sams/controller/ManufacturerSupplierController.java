package com.sams.controller;

import com.sams.dto.ManufacturerSupplierDTO;
import com.sams.service.ManufacturerSupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/manufacturer-suppliers")
@RequiredArgsConstructor
public class ManufacturerSupplierController {

    private final ManufacturerSupplierService service;

    @PostMapping
    public ResponseEntity<ManufacturerSupplierDTO> create(@RequestBody ManufacturerSupplierDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ManufacturerSupplierDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ManufacturerSupplierDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ManufacturerSupplierDTO> update(@PathVariable Long id, @RequestBody ManufacturerSupplierDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("ManufacturerSupplier deleted successfully!.");
    }
}