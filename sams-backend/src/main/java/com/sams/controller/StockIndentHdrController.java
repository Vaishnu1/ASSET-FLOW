package com.sams.controller;

import com.sams.dto.StockIndentHdrDTO;
import com.sams.service.StockIndentHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/stock-indent-hdrs")
@RequiredArgsConstructor
public class StockIndentHdrController {

    private final StockIndentHdrService service;

    @PostMapping
    public ResponseEntity<StockIndentHdrDTO> create(@RequestBody StockIndentHdrDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockIndentHdrDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<StockIndentHdrDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<StockIndentHdrDTO> update(@PathVariable Long id, @RequestBody StockIndentHdrDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("StockIndentHdr deleted successfully!.");
    }
}