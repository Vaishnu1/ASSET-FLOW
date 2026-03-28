package com.sams.controller;

import com.sams.dto.CustomerSiteRegDTO;
import com.sams.service.CustomerSiteRegService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-customer-site-regs")
@RequiredArgsConstructor
public class CustomerSiteRegController {

    private final CustomerSiteRegService service;

    @PostMapping
    public ResponseEntity<CustomerSiteRegDTO> create(@RequestBody CustomerSiteRegDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerSiteRegDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<CustomerSiteRegDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerSiteRegDTO> update(@PathVariable Long id, @RequestBody CustomerSiteRegDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("CustomerSiteReg deleted successfully!.");
    }
}