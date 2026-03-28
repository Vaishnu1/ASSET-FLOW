package com.sams.controller;

import com.sams.dto.PurchasingUsageDTO;
import com.sams.service.PurchasingUsageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-purchasing-usages")
@RequiredArgsConstructor
public class PurchasingUsageController {

    private final PurchasingUsageService service;

    @PostMapping
    public ResponseEntity<PurchasingUsageDTO> create(@RequestBody PurchasingUsageDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PurchasingUsageDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PurchasingUsageDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PurchasingUsageDTO> update(@PathVariable Long id, @RequestBody PurchasingUsageDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("PurchasingUsage deleted successfully!.");
    }
}