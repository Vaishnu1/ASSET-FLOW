package com.sams.controller;

import com.sams.dto.PoTermsAndConditionsDTO;
import com.sams.service.PoTermsAndConditionsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/po-terms-and-conditionses")
@RequiredArgsConstructor
public class PoTermsAndConditionsController {

    private final PoTermsAndConditionsService service;

    @PostMapping
    public ResponseEntity<PoTermsAndConditionsDTO> create(@RequestBody PoTermsAndConditionsDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PoTermsAndConditionsDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PoTermsAndConditionsDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PoTermsAndConditionsDTO> update(@PathVariable Long id, @RequestBody PoTermsAndConditionsDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("PoTermsAndConditions deleted successfully!.");
    }
}