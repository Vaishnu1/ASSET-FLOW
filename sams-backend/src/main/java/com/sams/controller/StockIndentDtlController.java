package com.sams.controller;

import com.sams.dto.StockIndentDtlDTO;
import com.sams.service.StockIndentDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/stock-indent-dtls")
@RequiredArgsConstructor
public class StockIndentDtlController {

    private final StockIndentDtlService service;

    @PostMapping
    public ResponseEntity<StockIndentDtlDTO> create(@RequestBody StockIndentDtlDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockIndentDtlDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<StockIndentDtlDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<StockIndentDtlDTO> update(@PathVariable Long id, @RequestBody StockIndentDtlDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("StockIndentDtl deleted successfully!.");
    }
}