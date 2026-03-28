package com.sams.controller;

import com.sams.dto.ItemTransactionsDTO;
import com.sams.service.ItemTransactionsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/item-transactionses")
@RequiredArgsConstructor
public class ItemTransactionsController {

    private final ItemTransactionsService service;

    @PostMapping
    public ResponseEntity<ItemTransactionsDTO> create(@RequestBody ItemTransactionsDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemTransactionsDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ItemTransactionsDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemTransactionsDTO> update(@PathVariable Long id, @RequestBody ItemTransactionsDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("ItemTransactions deleted successfully!.");
    }
}