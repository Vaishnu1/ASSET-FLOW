package com.sams.controller;

import com.sams.dto.SrAttribute5DTO;
import com.sams.service.SrAttribute5Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-sr-attribute-5s")
@RequiredArgsConstructor
public class SrAttribute5Controller {

    private final SrAttribute5Service service;

    @PostMapping
    public ResponseEntity<SrAttribute5DTO> create(@RequestBody SrAttribute5DTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SrAttribute5DTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SrAttribute5DTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SrAttribute5DTO> update(@PathVariable Long id, @RequestBody SrAttribute5DTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SrAttribute5 deleted successfully!.");
    }
}