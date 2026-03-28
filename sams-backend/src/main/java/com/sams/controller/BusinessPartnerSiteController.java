package com.sams.controller;

import com.sams.dto.BusinessPartnerSiteDTO;
import com.sams.service.BusinessPartnerSiteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-business-partner-sites")
@RequiredArgsConstructor
public class BusinessPartnerSiteController {

    private final BusinessPartnerSiteService service;

    @PostMapping
    public ResponseEntity<BusinessPartnerSiteDTO> create(@RequestBody BusinessPartnerSiteDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BusinessPartnerSiteDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<BusinessPartnerSiteDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BusinessPartnerSiteDTO> update(@PathVariable Long id, @RequestBody BusinessPartnerSiteDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("BusinessPartnerSite deleted successfully!.");
    }
}