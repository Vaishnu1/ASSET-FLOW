package com.sams.controller;

import com.sams.dto.ModelCheckPointsDTO;
import com.sams.service.ModelCheckPointsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-model-check-pointses")
@RequiredArgsConstructor
public class ModelCheckPointsController {

    private final ModelCheckPointsService service;

    @PostMapping
    public ResponseEntity<ModelCheckPointsDTO> create(@RequestBody ModelCheckPointsDTO dto) {
        return new ResponseEntity<>(service.createModelCheckPoints(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ModelCheckPointsDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getModelCheckPointsById(id));
    }

    @GetMapping
    public ResponseEntity<List<ModelCheckPointsDTO>> getAll() {
        return ResponseEntity.ok(service.getAllModelCheckPointses());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ModelCheckPointsDTO> update(@PathVariable Long id, @RequestBody ModelCheckPointsDTO dto) {
        return ResponseEntity.ok(service.updateModelCheckPoints(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteModelCheckPoints(id);
        return ResponseEntity.ok("ModelCheckPoints deleted successfully!.");
    }
}