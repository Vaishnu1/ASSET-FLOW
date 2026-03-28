package com.sams.controller;

import com.sams.dto.SourcingTypesDTO;
import com.sams.service.SourcingTypesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-sourcing-typeses")
@RequiredArgsConstructor
public class SourcingTypesController {

    private final SourcingTypesService service;

    @PostMapping
    public ResponseEntity<SourcingTypesDTO> create(@RequestBody SourcingTypesDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SourcingTypesDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SourcingTypesDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SourcingTypesDTO> update(@PathVariable Long id, @RequestBody SourcingTypesDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SourcingTypes deleted successfully!.");
    }
}