package com.sams.controller;

import com.sams.dto.ContractAssetDTO;
import com.sams.service.ContractAssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/contract-assets")
@RequiredArgsConstructor
public class ContractAssetController {

    private final ContractAssetService service;

    @PostMapping
    public ResponseEntity<ContractAssetDTO> create(@RequestBody ContractAssetDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContractAssetDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ContractAssetDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContractAssetDTO> update(@PathVariable Long id, @RequestBody ContractAssetDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("ContractAsset deleted successfully!.");
    }
}