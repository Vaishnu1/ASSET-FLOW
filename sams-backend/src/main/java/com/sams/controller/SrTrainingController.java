package com.sams.controller;

import com.sams.dto.SrTrainingDTO;
import com.sams.service.SrTrainingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/sr-trainings")
@RequiredArgsConstructor
public class SrTrainingController {

    private final SrTrainingService service;

    @PostMapping
    public ResponseEntity<SrTrainingDTO> create(@RequestBody SrTrainingDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SrTrainingDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SrTrainingDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SrTrainingDTO> update(@PathVariable Long id, @RequestBody SrTrainingDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SrTraining deleted successfully!.");
    }
}