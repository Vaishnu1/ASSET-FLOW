package com.sams.controller;

import com.sams.dto.SeverityDTO;
import com.sams.service.SeverityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-severities")
@RequiredArgsConstructor
public class SeverityController {

    private final SeverityService service;

    @PostMapping
    public ResponseEntity<SeverityDTO> create(@RequestBody SeverityDTO dto) {
        return new ResponseEntity<>(service.createSeverity(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SeverityDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getSeverityById(id));
    }

    @GetMapping
    public ResponseEntity<List<SeverityDTO>> getAll() {
        return ResponseEntity.ok(service.getAllSeverities());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SeverityDTO> update(@PathVariable Long id, @RequestBody SeverityDTO dto) {
        return ResponseEntity.ok(service.updateSeverity(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteSeverity(id);
        return ResponseEntity.ok("Severity deleted successfully!.");
    }
}