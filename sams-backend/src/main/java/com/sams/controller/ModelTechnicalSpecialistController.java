package com.sams.controller;

import com.sams.dto.ModelTechnicalSpecialistDTO;
import com.sams.service.ModelTechnicalSpecialistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/model-technical-specialists")
@RequiredArgsConstructor
public class ModelTechnicalSpecialistController {

    private final ModelTechnicalSpecialistService service;

    @PostMapping
    public ResponseEntity<ModelTechnicalSpecialistDTO> create(@RequestBody ModelTechnicalSpecialistDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ModelTechnicalSpecialistDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ModelTechnicalSpecialistDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ModelTechnicalSpecialistDTO> update(@PathVariable Long id, @RequestBody ModelTechnicalSpecialistDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("ModelTechnicalSpecialist deleted successfully!.");
    }
}