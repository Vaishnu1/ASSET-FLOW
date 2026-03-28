package com.sams.controller;

import com.sams.dto.InsuranceTypeDTO;
import com.sams.service.InsuranceTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/insurance-types")
@RequiredArgsConstructor
public class InsuranceTypeController {

    private final InsuranceTypeService service;

    @PostMapping
    public ResponseEntity<InsuranceTypeDTO> create(@RequestBody InsuranceTypeDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InsuranceTypeDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<InsuranceTypeDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<InsuranceTypeDTO> update(@PathVariable Long id, @RequestBody InsuranceTypeDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("InsuranceType deleted successfully!.");
    }
}