package com.sams.controller;

import com.sams.dto.AssetTemporaryAssigneeDTO;
import com.sams.service.AssetTemporaryAssigneeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-asset-temporary-assignees")
@RequiredArgsConstructor
public class AssetTemporaryAssigneeController {

    private final AssetTemporaryAssigneeService service;

    @PostMapping
    public ResponseEntity<AssetTemporaryAssigneeDTO> create(@RequestBody AssetTemporaryAssigneeDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetTemporaryAssigneeDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetTemporaryAssigneeDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetTemporaryAssigneeDTO> update(@PathVariable Long id, @RequestBody AssetTemporaryAssigneeDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("AssetTemporaryAssignee deleted successfully!.");
    }
}