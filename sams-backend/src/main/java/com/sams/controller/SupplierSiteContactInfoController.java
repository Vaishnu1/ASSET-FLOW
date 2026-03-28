package com.sams.controller;

import com.sams.dto.SupplierSiteContactInfoDTO;
import com.sams.service.SupplierSiteContactInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-supplier-site-contact-infos")
@RequiredArgsConstructor
public class SupplierSiteContactInfoController {

    private final SupplierSiteContactInfoService service;

    @PostMapping
    public ResponseEntity<SupplierSiteContactInfoDTO> create(@RequestBody SupplierSiteContactInfoDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupplierSiteContactInfoDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SupplierSiteContactInfoDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupplierSiteContactInfoDTO> update(@PathVariable Long id, @RequestBody SupplierSiteContactInfoDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SupplierSiteContactInfo deleted successfully!.");
    }
}