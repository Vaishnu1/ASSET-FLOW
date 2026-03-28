package com.sams.controller;

import com.sams.dto.CertificationAuthorityDTO;
import com.sams.service.CertificationAuthorityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-certification-authorities")
@RequiredArgsConstructor
public class CertificationAuthorityController {

    private final CertificationAuthorityService service;

    @PostMapping
    public ResponseEntity<CertificationAuthorityDTO> create(@RequestBody CertificationAuthorityDTO dto) {
        return new ResponseEntity<>(service.createCertificationAuthority(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CertificationAuthorityDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getCertificationAuthorityById(id));
    }

    @GetMapping
    public ResponseEntity<List<CertificationAuthorityDTO>> getAll() {
        return ResponseEntity.ok(service.getAllCertificationAuthorities());
    }

    @PutMapping("/{id}")
    public ResponseEntity<CertificationAuthorityDTO> update(@PathVariable Long id, @RequestBody CertificationAuthorityDTO dto) {
        return ResponseEntity.ok(service.updateCertificationAuthority(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteCertificationAuthority(id);
        return ResponseEntity.ok("CertificationAuthority deleted successfully!.");
    }
}