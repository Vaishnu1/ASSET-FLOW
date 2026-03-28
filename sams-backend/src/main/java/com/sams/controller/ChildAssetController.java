package com.sams.controller;

import com.sams.dto.ChildAssetDTO;
import com.sams.service.ChildAssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/child-assets")
@RequiredArgsConstructor
public class ChildAssetController {

    private final ChildAssetService service;

    @PostMapping
    public ResponseEntity<ChildAssetDTO> create(@RequestBody ChildAssetDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChildAssetDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ChildAssetDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ChildAssetDTO> update(@PathVariable Long id, @RequestBody ChildAssetDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("ChildAsset deleted successfully!.");
    }
}