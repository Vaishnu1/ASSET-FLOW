package com.sams.controller;

import com.sams.dto.StockTransferHdrDTO;
import com.sams.service.StockTransferHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-stock-transfer-hdrs")
@RequiredArgsConstructor
public class StockTransferHdrController {

    private final StockTransferHdrService service;

    @PostMapping
    public ResponseEntity<StockTransferHdrDTO> create(@RequestBody StockTransferHdrDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockTransferHdrDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<StockTransferHdrDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<StockTransferHdrDTO> update(@PathVariable Long id, @RequestBody StockTransferHdrDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("StockTransferHdr deleted successfully!.");
    }
}