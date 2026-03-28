package com.sams.controller;

import com.sams.dto.CurrencyCodeDTO;
import com.sams.service.CurrencyCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-currency-codes")
@RequiredArgsConstructor
public class CurrencyCodeController {

    private final CurrencyCodeService service;

    @PostMapping
    public ResponseEntity<CurrencyCodeDTO> create(@RequestBody CurrencyCodeDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CurrencyCodeDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<CurrencyCodeDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<CurrencyCodeDTO> update(@PathVariable Long id, @RequestBody CurrencyCodeDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("CurrencyCode deleted successfully!.");
    }
}