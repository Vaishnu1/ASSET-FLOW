package com.sams.controller;

import com.sams.dto.SupplierInvoicePaymentsDTO;
import com.sams.service.SupplierInvoicePaymentsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/supplier-invoice-paymentses")
@RequiredArgsConstructor
public class SupplierInvoicePaymentsController {

    private final SupplierInvoicePaymentsService service;

    @PostMapping
    public ResponseEntity<SupplierInvoicePaymentsDTO> create(@RequestBody SupplierInvoicePaymentsDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupplierInvoicePaymentsDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SupplierInvoicePaymentsDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupplierInvoicePaymentsDTO> update(@PathVariable Long id, @RequestBody SupplierInvoicePaymentsDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SupplierInvoicePayments deleted successfully!.");
    }
}