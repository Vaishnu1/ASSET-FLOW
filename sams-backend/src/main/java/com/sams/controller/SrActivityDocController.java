package com.sams.controller;

import com.sams.dto.SrActivityDocDTO;
import com.sams.service.SrActivityDocService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/sr-activity-docs")
@RequiredArgsConstructor
public class SrActivityDocController {

    private final SrActivityDocService service;

    @PostMapping
    public ResponseEntity<SrActivityDocDTO> create(@RequestBody SrActivityDocDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SrActivityDocDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SrActivityDocDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SrActivityDocDTO> update(@PathVariable Long id, @RequestBody SrActivityDocDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SrActivityDoc deleted successfully!.");
    }
}