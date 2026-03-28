package com.sams.controller;

import com.sams.dto.SrEscalationDTO;
import com.sams.service.SrEscalationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-sr-escalations")
@RequiredArgsConstructor
public class SrEscalationController {

    private final SrEscalationService service;

    @PostMapping
    public ResponseEntity<SrEscalationDTO> create(@RequestBody SrEscalationDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SrEscalationDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SrEscalationDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SrEscalationDTO> update(@PathVariable Long id, @RequestBody SrEscalationDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SrEscalation deleted successfully!.");
    }
}