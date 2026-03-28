package com.sams.controller;

import com.sams.dto.BusinessPartnerRegDTO;
import com.sams.service.BusinessPartnerRegService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-business-partner-regs")
@RequiredArgsConstructor
public class BusinessPartnerRegController {

    private final BusinessPartnerRegService service;

    @PostMapping
    public ResponseEntity<BusinessPartnerRegDTO> create(@RequestBody BusinessPartnerRegDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BusinessPartnerRegDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<BusinessPartnerRegDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BusinessPartnerRegDTO> update(@PathVariable Long id, @RequestBody BusinessPartnerRegDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("BusinessPartnerReg deleted successfully!.");
    }
}