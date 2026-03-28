package com.sams.controller;

import com.sams.dto.LocAssetCodeGenerationDTO;
import com.sams.service.LocAssetCodeGenerationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-loc-asset-code-generations")
@RequiredArgsConstructor
public class LocAssetCodeGenerationController {

    private final LocAssetCodeGenerationService service;

    @PostMapping
    public ResponseEntity<LocAssetCodeGenerationDTO> create(@RequestBody LocAssetCodeGenerationDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocAssetCodeGenerationDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<LocAssetCodeGenerationDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<LocAssetCodeGenerationDTO> update(@PathVariable Long id, @RequestBody LocAssetCodeGenerationDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("LocAssetCodeGeneration deleted successfully!.");
    }
}