package com.sams.controller;

import com.sams.dto.ContractDetailAssetDTO;
import com.sams.service.ContractDetailAssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-contract-detail-assets")
@RequiredArgsConstructor
public class ContractDetailAssetController {

    private final ContractDetailAssetService service;

    @PostMapping
    public ResponseEntity<ContractDetailAssetDTO> create(@RequestBody ContractDetailAssetDTO dto) {
        return new ResponseEntity<>(service.createContractDetailAsset(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContractDetailAssetDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getContractDetailAssetById(id));
    }

    @GetMapping
    public ResponseEntity<List<ContractDetailAssetDTO>> getAll() {
        return ResponseEntity.ok(service.getAllContractDetailAssets());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContractDetailAssetDTO> update(@PathVariable Long id, @RequestBody ContractDetailAssetDTO dto) {
        return ResponseEntity.ok(service.updateContractDetailAsset(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteContractDetailAsset(id);
        return ResponseEntity.ok("ContractDetailAsset deleted successfully!.");
    }
}