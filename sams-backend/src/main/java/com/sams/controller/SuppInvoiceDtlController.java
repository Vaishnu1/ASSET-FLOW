package com.sams.controller;

import com.sams.dto.SuppInvoiceDtlDTO;
import com.sams.service.SuppInvoiceDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/supp-invoice-dtls")
@RequiredArgsConstructor
public class SuppInvoiceDtlController {

    private final SuppInvoiceDtlService service;

    @PostMapping
    public ResponseEntity<SuppInvoiceDtlDTO> create(@RequestBody SuppInvoiceDtlDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SuppInvoiceDtlDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SuppInvoiceDtlDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SuppInvoiceDtlDTO> update(@PathVariable Long id, @RequestBody SuppInvoiceDtlDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SuppInvoiceDtl deleted successfully!.");
    }
}