package com.sams.controller;

import com.sams.dto.NumberControlDTO;
import com.sams.service.NumberControlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-number-controls")
@RequiredArgsConstructor
public class NumberControlController {

    private final NumberControlService service;

    @PostMapping
    public ResponseEntity<NumberControlDTO> create(@RequestBody NumberControlDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NumberControlDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<NumberControlDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<NumberControlDTO> update(@PathVariable Long id, @RequestBody NumberControlDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("NumberControl deleted successfully!.");
    }
}