package com.sams.controller;

import com.sams.dto.PurchasingTypeDTO;
import com.sams.service.PurchasingTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-purchasing-types")
@RequiredArgsConstructor
public class PurchasingTypeController {

    private final PurchasingTypeService service;

    @PostMapping
    public ResponseEntity<PurchasingTypeDTO> create(@RequestBody PurchasingTypeDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PurchasingTypeDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PurchasingTypeDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PurchasingTypeDTO> update(@PathVariable Long id, @RequestBody PurchasingTypeDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("PurchasingType deleted successfully!.");
    }
}