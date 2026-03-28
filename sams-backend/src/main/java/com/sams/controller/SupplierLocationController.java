package com.sams.controller;

import com.sams.dto.SupplierLocationDTO;
import com.sams.service.SupplierLocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-supplier-locations")
@RequiredArgsConstructor
public class SupplierLocationController {

    private final SupplierLocationService service;

    @PostMapping
    public ResponseEntity<SupplierLocationDTO> create(@RequestBody SupplierLocationDTO dto) {
        return new ResponseEntity<>(service.createSupplierLocation(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupplierLocationDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getSupplierLocationById(id));
    }

    @GetMapping
    public ResponseEntity<List<SupplierLocationDTO>> getAll() {
        return ResponseEntity.ok(service.getAllSupplierLocations());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupplierLocationDTO> update(@PathVariable Long id, @RequestBody SupplierLocationDTO dto) {
        return ResponseEntity.ok(service.updateSupplierLocation(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteSupplierLocation(id);
        return ResponseEntity.ok("SupplierLocation deleted successfully!.");
    }
}