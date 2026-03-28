package com.sams.controller;

import com.sams.dto.SrAttribute3DTO;
import com.sams.service.SrAttribute3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-sr-attribute-3s")
@RequiredArgsConstructor
public class SrAttribute3Controller {

    private final SrAttribute3Service service;

    @PostMapping
    public ResponseEntity<SrAttribute3DTO> create(@RequestBody SrAttribute3DTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SrAttribute3DTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SrAttribute3DTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SrAttribute3DTO> update(@PathVariable Long id, @RequestBody SrAttribute3DTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SrAttribute3 deleted successfully!.");
    }
}