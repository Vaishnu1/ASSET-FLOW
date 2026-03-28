package com.sams.controller;

import com.sams.dto.SupplierInvoiceTcInfoDTO;
import com.sams.service.SupplierInvoiceTcInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/supplier-invoice-tc-infos")
@RequiredArgsConstructor
public class SupplierInvoiceTcInfoController {

    private final SupplierInvoiceTcInfoService service;

    @PostMapping
    public ResponseEntity<SupplierInvoiceTcInfoDTO> create(@RequestBody SupplierInvoiceTcInfoDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupplierInvoiceTcInfoDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SupplierInvoiceTcInfoDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupplierInvoiceTcInfoDTO> update(@PathVariable Long id, @RequestBody SupplierInvoiceTcInfoDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SupplierInvoiceTcInfo deleted successfully!.");
    }
}