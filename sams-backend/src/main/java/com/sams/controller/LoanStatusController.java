package com.sams.controller;

import com.sams.dto.LoanStatusDTO;
import com.sams.service.LoanStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-loan-statuses")
@RequiredArgsConstructor
public class LoanStatusController {

    private final LoanStatusService service;

    @PostMapping
    public ResponseEntity<LoanStatusDTO> create(@RequestBody LoanStatusDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoanStatusDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<LoanStatusDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<LoanStatusDTO> update(@PathVariable Long id, @RequestBody LoanStatusDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("LoanStatus deleted successfully!.");
    }
}