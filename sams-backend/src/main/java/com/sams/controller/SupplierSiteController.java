package com.sams.controller;

import com.sams.dto.SupplierSiteDTO;
import com.sams.service.SupplierSiteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-supplier-sites")
@RequiredArgsConstructor
public class SupplierSiteController {

    private final SupplierSiteService service;

    @PostMapping
    public ResponseEntity<SupplierSiteDTO> create(@RequestBody SupplierSiteDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupplierSiteDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SupplierSiteDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupplierSiteDTO> update(@PathVariable Long id, @RequestBody SupplierSiteDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SupplierSite deleted successfully!.");
    }
}