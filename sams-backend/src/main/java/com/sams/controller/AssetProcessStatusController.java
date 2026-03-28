package com.sams.controller;

import com.sams.dto.AssetProcessStatusDTO;
import com.sams.service.AssetProcessStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-asset-process-statuses")
@RequiredArgsConstructor
public class AssetProcessStatusController {

    private final AssetProcessStatusService service;

    @PostMapping
    public ResponseEntity<AssetProcessStatusDTO> create(@RequestBody AssetProcessStatusDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetProcessStatusDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetProcessStatusDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetProcessStatusDTO> update(@PathVariable Long id, @RequestBody AssetProcessStatusDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("AssetProcessStatus deleted successfully!.");
    }
}