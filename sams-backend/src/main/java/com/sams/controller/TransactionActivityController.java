package com.sams.controller;

import com.sams.dto.TransactionActivityDTO;
import com.sams.service.TransactionActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/transaction-activities")
@RequiredArgsConstructor
public class TransactionActivityController {

    private final TransactionActivityService service;

    @PostMapping
    public ResponseEntity<TransactionActivityDTO> create(@RequestBody TransactionActivityDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionActivityDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<TransactionActivityDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransactionActivityDTO> update(@PathVariable Long id, @RequestBody TransactionActivityDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("TransactionActivity deleted successfully!.");
    }
}