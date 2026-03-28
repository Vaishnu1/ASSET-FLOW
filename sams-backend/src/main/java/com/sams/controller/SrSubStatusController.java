package com.sams.controller;

import com.sams.dto.SrSubStatusDTO;
import com.sams.service.SrSubStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-sr-sub-statuses")
@RequiredArgsConstructor
public class SrSubStatusController {

    private final SrSubStatusService service;

    @PostMapping
    public ResponseEntity<SrSubStatusDTO> create(@RequestBody SrSubStatusDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SrSubStatusDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SrSubStatusDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SrSubStatusDTO> update(@PathVariable Long id, @RequestBody SrSubStatusDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SrSubStatus deleted successfully!.");
    }
}