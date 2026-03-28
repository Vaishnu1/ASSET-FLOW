package com.sams.controller;

import com.sams.dto.ModelModuleDTO;
import com.sams.service.ModelModuleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/model-modules")
@RequiredArgsConstructor
public class ModelModuleController {

    private final ModelModuleService service;

    @PostMapping
    public ResponseEntity<ModelModuleDTO> create(@RequestBody ModelModuleDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ModelModuleDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ModelModuleDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ModelModuleDTO> update(@PathVariable Long id, @RequestBody ModelModuleDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("ModelModule deleted successfully!.");
    }
}