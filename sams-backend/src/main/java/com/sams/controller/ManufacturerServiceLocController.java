package com.sams.controller;

import com.sams.dto.ManufacturerServiceLocDTO;
import com.sams.service.ManufacturerServiceLocService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-manufacturer-service-locs")
@RequiredArgsConstructor
public class ManufacturerServiceLocController {

    private final ManufacturerServiceLocService service;

    @PostMapping
    public ResponseEntity<ManufacturerServiceLocDTO> create(@RequestBody ManufacturerServiceLocDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ManufacturerServiceLocDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ManufacturerServiceLocDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ManufacturerServiceLocDTO> update(@PathVariable Long id, @RequestBody ManufacturerServiceLocDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("ManufacturerServiceLoc deleted successfully!.");
    }
}