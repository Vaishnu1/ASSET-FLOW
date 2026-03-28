package com.sams.controller;

import com.sams.dto.ModelImageDTO;
import com.sams.service.ModelImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/model-images")
@RequiredArgsConstructor
public class ModelImageController {

    private final ModelImageService service;

    @PostMapping
    public ResponseEntity<ModelImageDTO> create(@RequestBody ModelImageDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ModelImageDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ModelImageDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ModelImageDTO> update(@PathVariable Long id, @RequestBody ModelImageDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("ModelImage deleted successfully!.");
    }
}