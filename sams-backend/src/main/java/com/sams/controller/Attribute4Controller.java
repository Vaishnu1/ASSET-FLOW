package com.sams.controller;

import com.sams.dto.Attribute4DTO;
import com.sams.service.Attribute4Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-attribute4s")
@RequiredArgsConstructor
public class Attribute4Controller {

    private final Attribute4Service service;

    @PostMapping
    public ResponseEntity<Attribute4DTO> create(@RequestBody Attribute4DTO dto) {
        return new ResponseEntity<>(service.createAttribute4(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Attribute4DTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAttribute4ById(id));
    }

    @GetMapping
    public ResponseEntity<List<Attribute4DTO>> getAll() {
        return ResponseEntity.ok(service.getAllAttribute4s());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Attribute4DTO> update(@PathVariable Long id, @RequestBody Attribute4DTO dto) {
        return ResponseEntity.ok(service.updateAttribute4(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteAttribute4(id);
        return ResponseEntity.ok("Attribute4 deleted successfully!.");
    }
}