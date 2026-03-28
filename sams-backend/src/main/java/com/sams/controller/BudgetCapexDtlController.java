package com.sams.controller;

import com.sams.dto.BudgetCapexDtlDTO;
import com.sams.service.BudgetCapexDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/budget-capex-dtls")
@RequiredArgsConstructor
public class BudgetCapexDtlController {

    private final BudgetCapexDtlService service;

    @PostMapping
    public ResponseEntity<BudgetCapexDtlDTO> create(@RequestBody BudgetCapexDtlDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BudgetCapexDtlDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<BudgetCapexDtlDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BudgetCapexDtlDTO> update(@PathVariable Long id, @RequestBody BudgetCapexDtlDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("BudgetCapexDtl deleted successfully!.");
    }
}