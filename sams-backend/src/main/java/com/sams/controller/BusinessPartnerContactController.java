package com.sams.controller;

import com.sams.dto.BusinessPartnerContactDTO;
import com.sams.service.BusinessPartnerContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-business-partner-contacts")
@RequiredArgsConstructor
public class BusinessPartnerContactController {

    private final BusinessPartnerContactService service;

    @PostMapping
    public ResponseEntity<BusinessPartnerContactDTO> create(@RequestBody BusinessPartnerContactDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BusinessPartnerContactDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<BusinessPartnerContactDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BusinessPartnerContactDTO> update(@PathVariable Long id, @RequestBody BusinessPartnerContactDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("BusinessPartnerContact deleted successfully!.");
    }
}