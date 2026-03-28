package com.sams.controller;

import com.sams.dto.SupplierInvoiceDocDTO;
import com.sams.service.SupplierInvoiceDocService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/supplier-invoice-docs")
@RequiredArgsConstructor
public class SupplierInvoiceDocController {

    private final SupplierInvoiceDocService service;

    @PostMapping
    public ResponseEntity<SupplierInvoiceDocDTO> create(@RequestBody SupplierInvoiceDocDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupplierInvoiceDocDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SupplierInvoiceDocDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupplierInvoiceDocDTO> update(@PathVariable Long id, @RequestBody SupplierInvoiceDocDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SupplierInvoiceDoc deleted successfully!.");
    }
}