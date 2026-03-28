package com.sams.controller;

import com.sams.dto.CustomerSiteLocationAccessDTO;
import com.sams.service.CustomerSiteLocationAccessService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-customer-site-location-accesses")
@RequiredArgsConstructor
public class CustomerSiteLocationAccessController {

    private final CustomerSiteLocationAccessService service;

    @PostMapping
    public ResponseEntity<CustomerSiteLocationAccessDTO> create(@RequestBody CustomerSiteLocationAccessDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerSiteLocationAccessDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<CustomerSiteLocationAccessDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerSiteLocationAccessDTO> update(@PathVariable Long id, @RequestBody CustomerSiteLocationAccessDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("CustomerSiteLocationAccess deleted successfully!.");
    }
}