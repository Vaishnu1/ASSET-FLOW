package com.sams.controller;

import com.sams.dto.BusinessPartnerRolesDTO;
import com.sams.service.BusinessPartnerRolesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-business-partner-roleses")
@RequiredArgsConstructor
public class BusinessPartnerRolesController {

    private final BusinessPartnerRolesService service;

    @PostMapping
    public ResponseEntity<BusinessPartnerRolesDTO> create(@RequestBody BusinessPartnerRolesDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BusinessPartnerRolesDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<BusinessPartnerRolesDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BusinessPartnerRolesDTO> update(@PathVariable Long id, @RequestBody BusinessPartnerRolesDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("BusinessPartnerRoles deleted successfully!.");
    }
}