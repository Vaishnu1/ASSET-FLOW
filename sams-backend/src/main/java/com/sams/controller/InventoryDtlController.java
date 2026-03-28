package com.sams.controller;

import com.sams.dto.InventoryDtlDTO;
import com.sams.service.InventoryDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/inventory-dtls")
@RequiredArgsConstructor
public class InventoryDtlController {

    private final InventoryDtlService service;

    @PostMapping
    public ResponseEntity<InventoryDtlDTO> create(@RequestBody InventoryDtlDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InventoryDtlDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<InventoryDtlDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<InventoryDtlDTO> update(@PathVariable Long id, @RequestBody InventoryDtlDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("InventoryDtl deleted successfully!.");
    }
}