package com.sams.controller;

import com.sams.dto.SuppInvoiceHdrDTO;
import com.sams.service.SuppInvoiceHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/supp-invoice-hdrs")
@RequiredArgsConstructor
public class SuppInvoiceHdrController {

    private final SuppInvoiceHdrService service;

    @PostMapping
    public ResponseEntity<SuppInvoiceHdrDTO> create(@RequestBody SuppInvoiceHdrDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SuppInvoiceHdrDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SuppInvoiceHdrDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SuppInvoiceHdrDTO> update(@PathVariable Long id, @RequestBody SuppInvoiceHdrDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SuppInvoiceHdr deleted successfully!.");
    }
}