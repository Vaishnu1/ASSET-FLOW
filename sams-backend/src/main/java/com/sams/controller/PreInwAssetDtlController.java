package com.sams.controller;

import com.sams.dto.PreInwAssetDtlDTO;
import com.sams.service.PreInwAssetDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/pre-inw-asset-dtls")
@RequiredArgsConstructor
public class PreInwAssetDtlController {

    private final PreInwAssetDtlService service;

    @PostMapping
    public ResponseEntity<PreInwAssetDtlDTO> create(@RequestBody PreInwAssetDtlDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PreInwAssetDtlDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PreInwAssetDtlDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PreInwAssetDtlDTO> update(@PathVariable Long id, @RequestBody PreInwAssetDtlDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("PreInwAssetDtl deleted successfully!.");
    }
}