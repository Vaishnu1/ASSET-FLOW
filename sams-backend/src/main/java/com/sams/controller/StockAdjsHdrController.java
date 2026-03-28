package com.sams.controller;

import com.sams.dto.StockAdjsHdrDTO;
import com.sams.service.StockAdjsHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-stock-adjs-hdrs")
@RequiredArgsConstructor
public class StockAdjsHdrController {

    private final StockAdjsHdrService service;

    @PostMapping
    public ResponseEntity<StockAdjsHdrDTO> create(@RequestBody StockAdjsHdrDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockAdjsHdrDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<StockAdjsHdrDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<StockAdjsHdrDTO> update(@PathVariable Long id, @RequestBody StockAdjsHdrDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("StockAdjsHdr deleted successfully!.");
    }
}