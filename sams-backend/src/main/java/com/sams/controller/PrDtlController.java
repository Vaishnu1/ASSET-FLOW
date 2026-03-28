package com.sams.controller;

import com.sams.dto.PrDtlDTO;
import com.sams.service.PrDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/pr-dtls")
@RequiredArgsConstructor
public class PrDtlController {

    private final PrDtlService service;

    @PostMapping
    public ResponseEntity<PrDtlDTO> create(@RequestBody PrDtlDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PrDtlDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PrDtlDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PrDtlDTO> update(@PathVariable Long id, @RequestBody PrDtlDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("PrDtl deleted successfully!.");
    }
}