package com.sams.controller;

import com.sams.dto.PrReasonDTO;
import com.sams.service.PrReasonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/pr-reasons")
@RequiredArgsConstructor
public class PrReasonController {

    private final PrReasonService service;

    @PostMapping
    public ResponseEntity<PrReasonDTO> create(@RequestBody PrReasonDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PrReasonDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PrReasonDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PrReasonDTO> update(@PathVariable Long id, @RequestBody PrReasonDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("PrReason deleted successfully!.");
    }
}