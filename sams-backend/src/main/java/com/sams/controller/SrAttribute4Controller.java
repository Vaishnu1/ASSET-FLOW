package com.sams.controller;

import com.sams.dto.SrAttribute4DTO;
import com.sams.service.SrAttribute4Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-sr-attribute-4s")
@RequiredArgsConstructor
public class SrAttribute4Controller {

    private final SrAttribute4Service service;

    @PostMapping
    public ResponseEntity<SrAttribute4DTO> create(@RequestBody SrAttribute4DTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SrAttribute4DTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SrAttribute4DTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SrAttribute4DTO> update(@PathVariable Long id, @RequestBody SrAttribute4DTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SrAttribute4 deleted successfully!.");
    }
}