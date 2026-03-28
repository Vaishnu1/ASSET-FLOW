package com.sams.controller;

import com.sams.dto.DbVersionDTO;
import com.sams.service.DbVersionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-db-versions")
@RequiredArgsConstructor
public class DbVersionController {

    private final DbVersionService service;

    @PostMapping
    public ResponseEntity<DbVersionDTO> create(@RequestBody DbVersionDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DbVersionDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<DbVersionDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<DbVersionDTO> update(@PathVariable Long id, @RequestBody DbVersionDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("DbVersion deleted successfully!.");
    }
}