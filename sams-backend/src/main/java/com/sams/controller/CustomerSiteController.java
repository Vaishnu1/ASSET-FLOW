package com.sams.controller;

import com.sams.dto.CustomerSiteDTO;
import com.sams.service.CustomerSiteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-customer-sites")
@RequiredArgsConstructor
public class CustomerSiteController {

    private final CustomerSiteService service;

    @PostMapping
    public ResponseEntity<CustomerSiteDTO> create(@RequestBody CustomerSiteDTO dto) {
        return new ResponseEntity<>(service.createCustomerSite(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerSiteDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getCustomerSiteById(id));
    }

    @GetMapping
    public ResponseEntity<List<CustomerSiteDTO>> getAll() {
        return ResponseEntity.ok(service.getAllCustomerSites());
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerSiteDTO> update(@PathVariable Long id, @RequestBody CustomerSiteDTO dto) {
        return ResponseEntity.ok(service.updateCustomerSite(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteCustomerSite(id);
        return ResponseEntity.ok("CustomerSite deleted successfully!.");
    }
}