package com.sams.controller;

import com.sams.dto.RetireSalvageDTO;
import com.sams.service.RetireSalvageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/retire-salvages")
@RequiredArgsConstructor
public class RetireSalvageController {

    private final RetireSalvageService service;

    @PostMapping
    public ResponseEntity<RetireSalvageDTO> create(@RequestBody RetireSalvageDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RetireSalvageDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<RetireSalvageDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<RetireSalvageDTO> update(@PathVariable Long id, @RequestBody RetireSalvageDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("RetireSalvage deleted successfully!.");
    }
}