package com.sams.controller;

import com.sams.dto.AssetInfoDTO;
import com.sams.service.AssetInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/asset-infos")
@RequiredArgsConstructor
public class AssetInfoController {

    private final AssetInfoService service;

    @PostMapping
    public ResponseEntity<AssetInfoDTO> create(@RequestBody AssetInfoDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetInfoDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetInfoDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetInfoDTO> update(@PathVariable Long id, @RequestBody AssetInfoDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("AssetInfo deleted successfully!.");
    }
}