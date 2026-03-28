package com.sams.controller;

import com.sams.dto.ModelDefectDTO;
import com.sams.service.ModelDefectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/model-defects")
@RequiredArgsConstructor
public class ModelDefectController {

    private final ModelDefectService service;

    @PostMapping
    public ResponseEntity<ModelDefectDTO> create(@RequestBody ModelDefectDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ModelDefectDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ModelDefectDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ModelDefectDTO> update(@PathVariable Long id, @RequestBody ModelDefectDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("ModelDefect deleted successfully!.");
    }
}