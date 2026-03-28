package com.sams.controller;

import com.sams.dto.StoreTypeDTO;
import com.sams.service.StoreTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-store-types")
@RequiredArgsConstructor
public class StoreTypeController {

    private final StoreTypeService service;

    @PostMapping
    public ResponseEntity<StoreTypeDTO> create(@RequestBody StoreTypeDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StoreTypeDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<StoreTypeDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<StoreTypeDTO> update(@PathVariable Long id, @RequestBody StoreTypeDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("StoreType deleted successfully!.");
    }
}