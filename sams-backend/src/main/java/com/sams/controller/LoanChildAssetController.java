package com.sams.controller;

import com.sams.dto.LoanChildAssetDTO;
import com.sams.service.LoanChildAssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/loan-child-assets")
@RequiredArgsConstructor
public class LoanChildAssetController {

    private final LoanChildAssetService service;

    @PostMapping
    public ResponseEntity<LoanChildAssetDTO> create(@RequestBody LoanChildAssetDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoanChildAssetDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<LoanChildAssetDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<LoanChildAssetDTO> update(@PathVariable Long id, @RequestBody LoanChildAssetDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("LoanChildAsset deleted successfully!.");
    }
}