package com.sams.controller;

import com.sams.dto.PreInwChildAssetDTO;
import com.sams.service.PreInwChildAssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/pre-inw-child-assets")
@RequiredArgsConstructor
public class PreInwChildAssetController {

    private final PreInwChildAssetService service;

    @PostMapping
    public ResponseEntity<PreInwChildAssetDTO> create(@RequestBody PreInwChildAssetDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PreInwChildAssetDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PreInwChildAssetDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PreInwChildAssetDTO> update(@PathVariable Long id, @RequestBody PreInwChildAssetDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("PreInwChildAsset deleted successfully!.");
    }
}