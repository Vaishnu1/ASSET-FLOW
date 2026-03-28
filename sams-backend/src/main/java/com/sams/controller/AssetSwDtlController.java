package com.sams.controller;

import com.sams.dto.AssetSwDtlDTO;
import com.sams.service.AssetSwDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/asset-sw-dtls")
@RequiredArgsConstructor
public class AssetSwDtlController {

    private final AssetSwDtlService service;

    @PostMapping
    public ResponseEntity<AssetSwDtlDTO> create(@RequestBody AssetSwDtlDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetSwDtlDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetSwDtlDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetSwDtlDTO> update(@PathVariable Long id, @RequestBody AssetSwDtlDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("AssetSwDtl deleted successfully!.");
    }
}