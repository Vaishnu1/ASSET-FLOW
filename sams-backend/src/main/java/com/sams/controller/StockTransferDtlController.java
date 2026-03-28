package com.sams.controller;

import com.sams.dto.StockTransferDtlDTO;
import com.sams.service.StockTransferDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-stock-transfer-dtls")
@RequiredArgsConstructor
public class StockTransferDtlController {

    private final StockTransferDtlService service;

    @PostMapping
    public ResponseEntity<StockTransferDtlDTO> create(@RequestBody StockTransferDtlDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockTransferDtlDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<StockTransferDtlDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<StockTransferDtlDTO> update(@PathVariable Long id, @RequestBody StockTransferDtlDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("StockTransferDtl deleted successfully!.");
    }
}