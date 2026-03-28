package com.sams.controller;

import com.sams.dto.BatchDtlDTO;
import com.sams.service.BatchDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-batch-dtls")
@RequiredArgsConstructor
public class BatchDtlController {

    private final BatchDtlService service;

    @PostMapping
    public ResponseEntity<BatchDtlDTO> create(@RequestBody BatchDtlDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BatchDtlDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<BatchDtlDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BatchDtlDTO> update(@PathVariable Long id, @RequestBody BatchDtlDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("BatchDtl deleted successfully!.");
    }
}