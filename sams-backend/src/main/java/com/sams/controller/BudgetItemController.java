package com.sams.controller;

import com.sams.dto.BudgetItemDTO;
import com.sams.service.BudgetItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-budget-items")
@RequiredArgsConstructor
public class BudgetItemController {

    private final BudgetItemService service;

    @PostMapping
    public ResponseEntity<BudgetItemDTO> create(@RequestBody BudgetItemDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BudgetItemDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<BudgetItemDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BudgetItemDTO> update(@PathVariable Long id, @RequestBody BudgetItemDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("BudgetItem deleted successfully!.");
    }
}