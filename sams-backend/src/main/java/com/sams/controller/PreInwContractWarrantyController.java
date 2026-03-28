package com.sams.controller;

import com.sams.dto.PreInwContractWarrantyDTO;
import com.sams.service.PreInwContractWarrantyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/pre-inw-contract-warranties")
@RequiredArgsConstructor
public class PreInwContractWarrantyController {

    private final PreInwContractWarrantyService service;

    @PostMapping
    public ResponseEntity<PreInwContractWarrantyDTO> create(@RequestBody PreInwContractWarrantyDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PreInwContractWarrantyDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PreInwContractWarrantyDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PreInwContractWarrantyDTO> update(@PathVariable Long id, @RequestBody PreInwContractWarrantyDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("PreInwContractWarranty deleted successfully!.");
    }
}