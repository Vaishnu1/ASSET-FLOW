package com.sams.controller;

import com.sams.dto.BudgetDtlDTO;
import com.sams.service.BudgetDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/budget-dtls")
@RequiredArgsConstructor
public class BudgetDtlController {

    private final BudgetDtlService service;

    @PostMapping
    public ResponseEntity<BudgetDtlDTO> create(@RequestBody BudgetDtlDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BudgetDtlDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<BudgetDtlDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BudgetDtlDTO> update(@PathVariable Long id, @RequestBody BudgetDtlDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("BudgetDtl deleted successfully!.");
    }
}