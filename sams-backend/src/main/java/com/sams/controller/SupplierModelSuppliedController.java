package com.sams.controller;

import com.sams.dto.SupplierModelSuppliedDTO;
import com.sams.service.SupplierModelSuppliedService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-supplier-model-supplieds")
@RequiredArgsConstructor
public class SupplierModelSuppliedController {

    private final SupplierModelSuppliedService service;

    @PostMapping
    public ResponseEntity<SupplierModelSuppliedDTO> create(@RequestBody SupplierModelSuppliedDTO dto) {
        return new ResponseEntity<>(service.createSupplierModelSupplied(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupplierModelSuppliedDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getSupplierModelSuppliedById(id));
    }

    @GetMapping
    public ResponseEntity<List<SupplierModelSuppliedDTO>> getAll() {
        return ResponseEntity.ok(service.getAllSupplierModelSupplieds());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupplierModelSuppliedDTO> update(@PathVariable Long id, @RequestBody SupplierModelSuppliedDTO dto) {
        return ResponseEntity.ok(service.updateSupplierModelSupplied(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteSupplierModelSupplied(id);
        return ResponseEntity.ok("SupplierModelSupplied deleted successfully!.");
    }
}