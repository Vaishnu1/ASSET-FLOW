package com.sams.controller;

import com.sams.dto.LocatorWarehouseDTO;
import com.sams.service.LocatorWarehouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-locator-warehouses")
@RequiredArgsConstructor
public class LocatorWarehouseController {

    private final LocatorWarehouseService service;

    @PostMapping
    public ResponseEntity<LocatorWarehouseDTO> create(@RequestBody LocatorWarehouseDTO dto) {
        return new ResponseEntity<>(service.createLocatorWarehouse(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocatorWarehouseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getLocatorWarehouseById(id));
    }

    @GetMapping
    public ResponseEntity<List<LocatorWarehouseDTO>> getAll() {
        return ResponseEntity.ok(service.getAllLocatorWarehouses());
    }

    @PutMapping("/{id}")
    public ResponseEntity<LocatorWarehouseDTO> update(@PathVariable Long id, @RequestBody LocatorWarehouseDTO dto) {
        return ResponseEntity.ok(service.updateLocatorWarehouse(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteLocatorWarehouse(id);
        return ResponseEntity.ok("LocatorWarehouse deleted successfully!.");
    }
}