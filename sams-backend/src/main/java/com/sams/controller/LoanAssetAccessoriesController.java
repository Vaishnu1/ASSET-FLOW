package com.sams.controller;

import com.sams.dto.LoanAssetAccessoriesDTO;
import com.sams.service.LoanAssetAccessoriesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/loan-asset-accessorieses")
@RequiredArgsConstructor
public class LoanAssetAccessoriesController {

    private final LoanAssetAccessoriesService service;

    @PostMapping
    public ResponseEntity<LoanAssetAccessoriesDTO> create(@RequestBody LoanAssetAccessoriesDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoanAssetAccessoriesDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<LoanAssetAccessoriesDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<LoanAssetAccessoriesDTO> update(@PathVariable Long id, @RequestBody LoanAssetAccessoriesDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("LoanAssetAccessories deleted successfully!.");
    }
}