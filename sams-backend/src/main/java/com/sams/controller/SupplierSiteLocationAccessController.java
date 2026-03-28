package com.sams.controller;

import com.sams.dto.SupplierSiteLocationAccessDTO;
import com.sams.service.SupplierSiteLocationAccessService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-supplier-site-location-accesses")
@RequiredArgsConstructor
public class SupplierSiteLocationAccessController {

    private final SupplierSiteLocationAccessService service;

    @PostMapping
    public ResponseEntity<SupplierSiteLocationAccessDTO> create(@RequestBody SupplierSiteLocationAccessDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupplierSiteLocationAccessDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SupplierSiteLocationAccessDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupplierSiteLocationAccessDTO> update(@PathVariable Long id, @RequestBody SupplierSiteLocationAccessDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SupplierSiteLocationAccess deleted successfully!.");
    }
}