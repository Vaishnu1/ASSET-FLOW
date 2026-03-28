package com.sams.controller;

import com.sams.dto.SrTrainingEmployeeDTO;
import com.sams.service.SrTrainingEmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/sr-training-employees")
@RequiredArgsConstructor
public class SrTrainingEmployeeController {

    private final SrTrainingEmployeeService service;

    @PostMapping
    public ResponseEntity<SrTrainingEmployeeDTO> create(@RequestBody SrTrainingEmployeeDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SrTrainingEmployeeDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SrTrainingEmployeeDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SrTrainingEmployeeDTO> update(@PathVariable Long id, @RequestBody SrTrainingEmployeeDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SrTrainingEmployee deleted successfully!.");
    }
}