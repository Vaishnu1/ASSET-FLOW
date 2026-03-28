package com.sams.controller;

import com.sams.dto.Attribute3DTO;
import com.sams.service.Attribute3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-attribute3s")
@RequiredArgsConstructor
public class Attribute3Controller {

    private final Attribute3Service service;

    @PostMapping
    public ResponseEntity<Attribute3DTO> create(@RequestBody Attribute3DTO dto) {
        return new ResponseEntity<>(service.createAttribute3(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Attribute3DTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAttribute3ById(id));
    }

    @GetMapping
    public ResponseEntity<List<Attribute3DTO>> getAll() {
        return ResponseEntity.ok(service.getAllAttribute3s());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Attribute3DTO> update(@PathVariable Long id, @RequestBody Attribute3DTO dto) {
        return ResponseEntity.ok(service.updateAttribute3(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteAttribute3(id);
        return ResponseEntity.ok("Attribute3 deleted successfully!.");
    }
}