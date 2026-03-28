package com.sams.controller;

import com.sams.dto.SupplierInvoiceHdrDTO;
import com.sams.service.SupplierInvoiceHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/supplier-invoice-hdrs")
@RequiredArgsConstructor
public class SupplierInvoiceHdrController {

    private final SupplierInvoiceHdrService service;

    @PostMapping
    public ResponseEntity<SupplierInvoiceHdrDTO> create(@RequestBody SupplierInvoiceHdrDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupplierInvoiceHdrDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SupplierInvoiceHdrDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupplierInvoiceHdrDTO> update(@PathVariable Long id, @RequestBody SupplierInvoiceHdrDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SupplierInvoiceHdr deleted successfully!.");
    }
}