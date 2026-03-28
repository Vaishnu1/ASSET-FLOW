package com.sams.controller;

import com.sams.dto.CertificateDTO;
import com.sams.service.CertificateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-certificates")
@RequiredArgsConstructor
public class CertificateController {

    private final CertificateService service;

    @PostMapping
    public ResponseEntity<CertificateDTO> create(@RequestBody CertificateDTO dto) {
        return new ResponseEntity<>(service.createCertificate(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CertificateDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getCertificateById(id));
    }

    @GetMapping
    public ResponseEntity<List<CertificateDTO>> getAll() {
        return ResponseEntity.ok(service.getAllCertificates());
    }

    @PutMapping("/{id}")
    public ResponseEntity<CertificateDTO> update(@PathVariable Long id, @RequestBody CertificateDTO dto) {
        return ResponseEntity.ok(service.updateCertificate(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteCertificate(id);
        return ResponseEntity.ok("Certificate deleted successfully!.");
    }
}