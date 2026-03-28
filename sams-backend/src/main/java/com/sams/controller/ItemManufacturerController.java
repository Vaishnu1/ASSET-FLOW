package com.sams.controller;

import com.sams.dto.ItemManufacturerDTO;
import com.sams.service.ItemManufacturerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-item-manufacturers")
@RequiredArgsConstructor
public class ItemManufacturerController {

    private final ItemManufacturerService service;

    @PostMapping
    public ResponseEntity<ItemManufacturerDTO> create(@RequestBody ItemManufacturerDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemManufacturerDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ItemManufacturerDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemManufacturerDTO> update(@PathVariable Long id, @RequestBody ItemManufacturerDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("ItemManufacturer deleted successfully!.");
    }
}