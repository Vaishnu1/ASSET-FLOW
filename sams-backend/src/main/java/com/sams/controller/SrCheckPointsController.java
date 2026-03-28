package com.sams.controller;

import com.sams.dto.SrCheckPointsDTO;
import com.sams.service.SrCheckPointsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/sr-check-pointses")
@RequiredArgsConstructor
public class SrCheckPointsController {

    private final SrCheckPointsService service;

    @PostMapping
    public ResponseEntity<SrCheckPointsDTO> create(@RequestBody SrCheckPointsDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SrCheckPointsDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SrCheckPointsDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SrCheckPointsDTO> update(@PathVariable Long id, @RequestBody SrCheckPointsDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SrCheckPoints deleted successfully!.");
    }
}