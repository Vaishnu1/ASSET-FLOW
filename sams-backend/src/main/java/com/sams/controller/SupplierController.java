package com.sams.controller;

import com.sams.dto.SupplierDTO;
import com.sams.service.SupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-suppliers")
@RequiredArgsConstructor
public class SupplierController {

    private final SupplierService service;

    @PostMapping
    public ResponseEntity<SupplierDTO> create(@RequestBody SupplierDTO dto) {
        return new ResponseEntity<>(service.createSupplier(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupplierDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getSupplierById(id));
    }

    @GetMapping
    public ResponseEntity<List<SupplierDTO>> getAll() {
        return ResponseEntity.ok(service.getAllSuppliers());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupplierDTO> update(@PathVariable Long id, @RequestBody SupplierDTO dto) {
        return ResponseEntity.ok(service.updateSupplier(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteSupplier(id);
        return ResponseEntity.ok("Supplier deleted successfully!.");
    }
}