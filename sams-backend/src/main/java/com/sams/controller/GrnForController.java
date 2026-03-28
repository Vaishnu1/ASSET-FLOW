package com.sams.controller;

import com.sams.dto.GrnForDTO;
import com.sams.service.GrnForService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-grn-fors")
@RequiredArgsConstructor
public class GrnForController {

    private final GrnForService service;

    @PostMapping
    public ResponseEntity<GrnForDTO> create(@RequestBody GrnForDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GrnForDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<GrnForDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<GrnForDTO> update(@PathVariable Long id, @RequestBody GrnForDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("GrnFor deleted successfully!.");
    }
}