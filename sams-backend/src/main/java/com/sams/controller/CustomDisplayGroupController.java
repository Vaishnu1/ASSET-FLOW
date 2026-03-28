package com.sams.controller;

import com.sams.dto.CustomDisplayGroupDTO;
import com.sams.service.CustomDisplayGroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-custom-display-groups")
@RequiredArgsConstructor
public class CustomDisplayGroupController {

    private final CustomDisplayGroupService service;

    @PostMapping
    public ResponseEntity<CustomDisplayGroupDTO> create(@RequestBody CustomDisplayGroupDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomDisplayGroupDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<CustomDisplayGroupDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomDisplayGroupDTO> update(@PathVariable Long id, @RequestBody CustomDisplayGroupDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("CustomDisplayGroup deleted successfully!.");
    }
}