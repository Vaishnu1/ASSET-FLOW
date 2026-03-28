package com.sams.controller;

import com.sams.dto.ModelChildDTO;
import com.sams.service.ModelChildService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-model-childs")
@RequiredArgsConstructor
public class ModelChildController {

    private final ModelChildService service;

    @PostMapping
    public ResponseEntity<ModelChildDTO> create(@RequestBody ModelChildDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ModelChildDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ModelChildDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ModelChildDTO> update(@PathVariable Long id, @RequestBody ModelChildDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("ModelChild deleted successfully!.");
    }
}