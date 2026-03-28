package com.sams.controller;

import com.sams.dto.PreInwAssetHdrDTO;
import com.sams.service.PreInwAssetHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/pre-inw-asset-hdrs")
@RequiredArgsConstructor
public class PreInwAssetHdrController {

    private final PreInwAssetHdrService service;

    @PostMapping
    public ResponseEntity<PreInwAssetHdrDTO> create(@RequestBody PreInwAssetHdrDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PreInwAssetHdrDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PreInwAssetHdrDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PreInwAssetHdrDTO> update(@PathVariable Long id, @RequestBody PreInwAssetHdrDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("PreInwAssetHdr deleted successfully!.");
    }
}