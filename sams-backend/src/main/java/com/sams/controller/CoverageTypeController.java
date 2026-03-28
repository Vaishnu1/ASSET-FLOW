package com.sams.controller;

import com.sams.dto.CoverageTypeDTO;
import com.sams.service.CoverageTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/coverage-types")
@RequiredArgsConstructor
public class CoverageTypeController {

    private final CoverageTypeService service;

    @PostMapping
    public ResponseEntity<CoverageTypeDTO> create(@RequestBody CoverageTypeDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CoverageTypeDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<CoverageTypeDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<CoverageTypeDTO> update(@PathVariable Long id, @RequestBody CoverageTypeDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("CoverageType deleted successfully!.");
    }
}