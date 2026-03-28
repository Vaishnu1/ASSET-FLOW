package com.sams.controller;

import com.sams.dto.AssetTransactionDTO;
import com.sams.service.AssetTransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-asset-transactions")
@RequiredArgsConstructor
public class AssetTransactionController {

    private final AssetTransactionService service;

    @PostMapping
    public ResponseEntity<AssetTransactionDTO> create(@RequestBody AssetTransactionDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetTransactionDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetTransactionDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetTransactionDTO> update(@PathVariable Long id, @RequestBody AssetTransactionDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("AssetTransaction deleted successfully!.");
    }
}