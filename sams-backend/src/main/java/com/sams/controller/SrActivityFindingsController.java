package com.sams.controller;

import com.sams.dto.SrActivityFindingsDTO;
import com.sams.service.SrActivityFindingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-sr-activity-findingses")
@RequiredArgsConstructor
public class SrActivityFindingsController {

    private final SrActivityFindingsService service;

    @PostMapping
    public ResponseEntity<SrActivityFindingsDTO> create(@RequestBody SrActivityFindingsDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SrActivityFindingsDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SrActivityFindingsDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SrActivityFindingsDTO> update(@PathVariable Long id, @RequestBody SrActivityFindingsDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SrActivityFindings deleted successfully!.");
    }
}