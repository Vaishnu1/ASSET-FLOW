package com.sams.controller;

import com.sams.dto.AssetGroupStatCertificateDTO;
import com.sams.service.AssetGroupStatCertificateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/asset-group-stat-certificates")
@RequiredArgsConstructor
public class AssetGroupStatCertificateController {

    private final AssetGroupStatCertificateService service;

    @PostMapping
    public ResponseEntity<AssetGroupStatCertificateDTO> create(@RequestBody AssetGroupStatCertificateDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetGroupStatCertificateDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetGroupStatCertificateDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetGroupStatCertificateDTO> update(@PathVariable Long id, @RequestBody AssetGroupStatCertificateDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("AssetGroupStatCertificate deleted successfully!.");
    }
}