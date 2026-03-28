package com.sams.controller;

import com.sams.dto.LegalEntityDTO;
import com.sams.service.LegalEntityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-legal-entities")
@RequiredArgsConstructor
public class LegalEntityController {

    private final LegalEntityService service;

    @PostMapping
    public ResponseEntity<LegalEntityDTO> create(@RequestBody LegalEntityDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LegalEntityDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<LegalEntityDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<LegalEntityDTO> update(@PathVariable Long id, @RequestBody LegalEntityDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("LegalEntity deleted successfully!.");
    }
}