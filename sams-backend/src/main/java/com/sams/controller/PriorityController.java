package com.sams.controller;

import com.sams.dto.PriorityDTO;
import com.sams.service.PriorityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-priorities")
@RequiredArgsConstructor
public class PriorityController {

    private final PriorityService service;

    @PostMapping
    public ResponseEntity<PriorityDTO> create(@RequestBody PriorityDTO dto) {
        return new ResponseEntity<>(service.createPriority(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PriorityDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getPriorityById(id));
    }

    @GetMapping
    public ResponseEntity<List<PriorityDTO>> getAll() {
        return ResponseEntity.ok(service.getAllPriorities());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PriorityDTO> update(@PathVariable Long id, @RequestBody PriorityDTO dto) {
        return ResponseEntity.ok(service.updatePriority(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deletePriority(id);
        return ResponseEntity.ok("Priority deleted successfully!.");
    }
}