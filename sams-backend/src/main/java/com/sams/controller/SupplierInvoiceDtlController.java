package com.sams.controller;

import com.sams.dto.SupplierInvoiceDtlDTO;
import com.sams.service.SupplierInvoiceDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/supplier-invoice-dtls")
@RequiredArgsConstructor
public class SupplierInvoiceDtlController {

    private final SupplierInvoiceDtlService service;

    @PostMapping
    public ResponseEntity<SupplierInvoiceDtlDTO> create(@RequestBody SupplierInvoiceDtlDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupplierInvoiceDtlDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SupplierInvoiceDtlDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupplierInvoiceDtlDTO> update(@PathVariable Long id, @RequestBody SupplierInvoiceDtlDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SupplierInvoiceDtl deleted successfully!.");
    }
}