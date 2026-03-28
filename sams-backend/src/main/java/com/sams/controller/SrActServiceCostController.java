package com.sams.controller;

import com.sams.dto.SrActServiceCostDTO;
import com.sams.service.SrActServiceCostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/sr-act-service-costs")
@RequiredArgsConstructor
public class SrActServiceCostController {

    private final SrActServiceCostService service;

    @PostMapping
    public ResponseEntity<SrActServiceCostDTO> create(@RequestBody SrActServiceCostDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SrActServiceCostDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SrActServiceCostDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SrActServiceCostDTO> update(@PathVariable Long id, @RequestBody SrActServiceCostDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SrActServiceCost deleted successfully!.");
    }
}