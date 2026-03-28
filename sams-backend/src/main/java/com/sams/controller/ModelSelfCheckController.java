package com.sams.controller;

import com.sams.dto.ModelSelfCheckDTO;
import com.sams.service.ModelSelfCheckService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/model-self-checks")
@RequiredArgsConstructor
public class ModelSelfCheckController {

    private final ModelSelfCheckService service;

    @PostMapping
    public ResponseEntity<ModelSelfCheckDTO> create(@RequestBody ModelSelfCheckDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ModelSelfCheckDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ModelSelfCheckDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ModelSelfCheckDTO> update(@PathVariable Long id, @RequestBody ModelSelfCheckDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("ModelSelfCheck deleted successfully!.");
    }
}