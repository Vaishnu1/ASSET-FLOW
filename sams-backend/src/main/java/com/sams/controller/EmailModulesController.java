package com.sams.controller;

import com.sams.dto.EmailModulesDTO;
import com.sams.service.EmailModulesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/email-moduleses")
@RequiredArgsConstructor
public class EmailModulesController {

    private final EmailModulesService service;

    @PostMapping
    public ResponseEntity<EmailModulesDTO> create(@RequestBody EmailModulesDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmailModulesDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<EmailModulesDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmailModulesDTO> update(@PathVariable Long id, @RequestBody EmailModulesDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("EmailModules deleted successfully!.");
    }
}