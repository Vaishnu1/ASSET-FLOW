package com.sams.controller;

import com.sams.dto.AccessoriesConsumablesSparepartsDTO;
import com.sams.service.AccessoriesConsumablesSparepartsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/accessories-consumables-sparepartses")
@RequiredArgsConstructor
public class AccessoriesConsumablesSparepartsController {

    private final AccessoriesConsumablesSparepartsService service;

    @PostMapping
    public ResponseEntity<AccessoriesConsumablesSparepartsDTO> create(@RequestBody AccessoriesConsumablesSparepartsDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccessoriesConsumablesSparepartsDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<AccessoriesConsumablesSparepartsDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AccessoriesConsumablesSparepartsDTO> update(@PathVariable Long id, @RequestBody AccessoriesConsumablesSparepartsDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("AccessoriesConsumablesSpareparts deleted successfully!.");
    }
}