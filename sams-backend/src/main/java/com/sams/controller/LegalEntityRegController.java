package com.sams.controller;

import com.sams.dto.LegalEntityRegDTO;
import com.sams.service.LegalEntityRegService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-legal-entity-regs")
@RequiredArgsConstructor
public class LegalEntityRegController {

    private final LegalEntityRegService service;

    @PostMapping
    public ResponseEntity<LegalEntityRegDTO> create(@RequestBody LegalEntityRegDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LegalEntityRegDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<LegalEntityRegDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<LegalEntityRegDTO> update(@PathVariable Long id, @RequestBody LegalEntityRegDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("LegalEntityReg deleted successfully!.");
    }
}