package com.sams.controller;

import com.sams.dto.LoanReturnDTO;
import com.sams.service.LoanReturnService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/loan-returns")
@RequiredArgsConstructor
public class LoanReturnController {

    private final LoanReturnService service;

    @PostMapping
    public ResponseEntity<LoanReturnDTO> create(@RequestBody LoanReturnDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoanReturnDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<LoanReturnDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<LoanReturnDTO> update(@PathVariable Long id, @RequestBody LoanReturnDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("LoanReturn deleted successfully!.");
    }
}