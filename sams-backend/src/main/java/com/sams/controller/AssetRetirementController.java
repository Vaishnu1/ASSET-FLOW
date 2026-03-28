package com.sams.controller;

import com.sams.dto.AssetRetirementDTO;
import com.sams.service.AssetRetirementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/asset-retirements")
@RequiredArgsConstructor
public class AssetRetirementController {

    private final AssetRetirementService service;

    @PostMapping
    public ResponseEntity<AssetRetirementDTO> create(@RequestBody AssetRetirementDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetRetirementDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetRetirementDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetRetirementDTO> update(@PathVariable Long id, @RequestBody AssetRetirementDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("AssetRetirement deleted successfully!.");
    }
}