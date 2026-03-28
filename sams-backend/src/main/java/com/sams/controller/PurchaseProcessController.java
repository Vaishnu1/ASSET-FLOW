package com.sams.controller;

import com.sams.dto.PurchaseProcessDTO;
import com.sams.service.PurchaseProcessService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-purchase-processes")
@RequiredArgsConstructor
public class PurchaseProcessController {

    private final PurchaseProcessService service;

    @PostMapping
    public ResponseEntity<PurchaseProcessDTO> create(@RequestBody PurchaseProcessDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PurchaseProcessDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PurchaseProcessDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PurchaseProcessDTO> update(@PathVariable Long id, @RequestBody PurchaseProcessDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("PurchaseProcess deleted successfully!.");
    }
}