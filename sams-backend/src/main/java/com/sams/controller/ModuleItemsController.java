package com.sams.controller;

import com.sams.dto.ModuleItemsDTO;
import com.sams.service.ModuleItemsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-module-itemses")
@RequiredArgsConstructor
public class ModuleItemsController {

    private final ModuleItemsService service;

    @PostMapping
    public ResponseEntity<ModuleItemsDTO> create(@RequestBody ModuleItemsDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ModuleItemsDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ModuleItemsDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ModuleItemsDTO> update(@PathVariable Long id, @RequestBody ModuleItemsDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("ModuleItems deleted successfully!.");
    }
}