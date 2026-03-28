package com.sams.controller;

import com.sams.dto.BusinessPartnerDTO;
import com.sams.service.BusinessPartnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-business-partners")
@RequiredArgsConstructor
public class BusinessPartnerController {

    private final BusinessPartnerService service;

    @PostMapping
    public ResponseEntity<BusinessPartnerDTO> create(@RequestBody BusinessPartnerDTO dto) {
        return new ResponseEntity<>(service.createBusinessPartner(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BusinessPartnerDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getBusinessPartnerById(id));
    }

    @GetMapping
    public ResponseEntity<List<BusinessPartnerDTO>> getAll() {
        return ResponseEntity.ok(service.getAllBusinessPartners());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BusinessPartnerDTO> update(@PathVariable Long id, @RequestBody BusinessPartnerDTO dto) {
        return ResponseEntity.ok(service.updateBusinessPartner(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteBusinessPartner(id);
        return ResponseEntity.ok("BusinessPartner deleted successfully!.");
    }
}