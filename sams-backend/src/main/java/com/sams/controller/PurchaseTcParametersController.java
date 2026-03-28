package com.sams.controller;

import com.sams.dto.PurchaseTcParametersDTO;
import com.sams.service.PurchaseTcParametersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-purchase-tc-parameterses")
@RequiredArgsConstructor
public class PurchaseTcParametersController {

    private final PurchaseTcParametersService service;

    @PostMapping
    public ResponseEntity<PurchaseTcParametersDTO> create(@RequestBody PurchaseTcParametersDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PurchaseTcParametersDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PurchaseTcParametersDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PurchaseTcParametersDTO> update(@PathVariable Long id, @RequestBody PurchaseTcParametersDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("PurchaseTcParameters deleted successfully!.");
    }
}