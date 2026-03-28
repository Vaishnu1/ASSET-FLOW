package com.sams.controller;

import com.sams.dto.PurchaseStatusDTO;
import com.sams.service.PurchaseStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/purchase-statuses")
@RequiredArgsConstructor
public class PurchaseStatusController {

    private final PurchaseStatusService service;

    @PostMapping
    public ResponseEntity<PurchaseStatusDTO> create(@RequestBody PurchaseStatusDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PurchaseStatusDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PurchaseStatusDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PurchaseStatusDTO> update(@PathVariable Long id, @RequestBody PurchaseStatusDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("PurchaseStatus deleted successfully!.");
    }
}