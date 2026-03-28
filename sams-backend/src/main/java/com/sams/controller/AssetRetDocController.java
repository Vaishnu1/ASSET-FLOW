package com.sams.controller;

import com.sams.dto.AssetRetDocDTO;
import com.sams.service.AssetRetDocService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/asset-ret-docs")
@RequiredArgsConstructor
public class AssetRetDocController {

    private final AssetRetDocService service;

    @PostMapping
    public ResponseEntity<AssetRetDocDTO> create(@RequestBody AssetRetDocDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetRetDocDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetRetDocDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetRetDocDTO> update(@PathVariable Long id, @RequestBody AssetRetDocDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("AssetRetDoc deleted successfully!.");
    }
}