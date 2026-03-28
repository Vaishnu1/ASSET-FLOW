package com.sams.controller;

import com.sams.dto.StockAdjsDtlDTO;
import com.sams.service.StockAdjsDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-stock-adjs-dtls")
@RequiredArgsConstructor
public class StockAdjsDtlController {

    private final StockAdjsDtlService service;

    @PostMapping
    public ResponseEntity<StockAdjsDtlDTO> create(@RequestBody StockAdjsDtlDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockAdjsDtlDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<StockAdjsDtlDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<StockAdjsDtlDTO> update(@PathVariable Long id, @RequestBody StockAdjsDtlDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("StockAdjsDtl deleted successfully!.");
    }
}