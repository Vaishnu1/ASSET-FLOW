package com.sams.controller;

import com.sams.dto.FunctionalityDTO;
import com.sams.service.FunctionalityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-functionalities")
@RequiredArgsConstructor
public class FunctionalityController {

    private final FunctionalityService service;

    @PostMapping
    public ResponseEntity<FunctionalityDTO> create(@RequestBody FunctionalityDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FunctionalityDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<FunctionalityDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<FunctionalityDTO> update(@PathVariable Long id, @RequestBody FunctionalityDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("Functionality deleted successfully!.");
    }
}