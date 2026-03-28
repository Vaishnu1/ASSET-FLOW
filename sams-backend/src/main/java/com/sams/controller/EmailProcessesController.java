package com.sams.controller;

import com.sams.dto.EmailProcessesDTO;
import com.sams.service.EmailProcessesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/email-processeses")
@RequiredArgsConstructor
public class EmailProcessesController {

    private final EmailProcessesService service;

    @PostMapping
    public ResponseEntity<EmailProcessesDTO> create(@RequestBody EmailProcessesDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmailProcessesDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<EmailProcessesDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmailProcessesDTO> update(@PathVariable Long id, @RequestBody EmailProcessesDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("EmailProcesses deleted successfully!.");
    }
}