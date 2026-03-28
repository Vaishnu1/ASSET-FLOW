package com.sams.controller;

import com.sams.dto.Attribute5DTO;
import com.sams.service.Attribute5Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-attribute5s")
@RequiredArgsConstructor
public class Attribute5Controller {

    private final Attribute5Service service;

    @PostMapping
    public ResponseEntity<Attribute5DTO> create(@RequestBody Attribute5DTO dto) {
        return new ResponseEntity<>(service.createAttribute5(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Attribute5DTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAttribute5ById(id));
    }

    @GetMapping
    public ResponseEntity<List<Attribute5DTO>> getAll() {
        return ResponseEntity.ok(service.getAllAttribute5s());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Attribute5DTO> update(@PathVariable Long id, @RequestBody Attribute5DTO dto) {
        return ResponseEntity.ok(service.updateAttribute5(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteAttribute5(id);
        return ResponseEntity.ok("Attribute5 deleted successfully!.");
    }
}