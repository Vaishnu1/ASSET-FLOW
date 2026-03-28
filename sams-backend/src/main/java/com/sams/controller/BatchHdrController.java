package com.sams.controller;

import com.sams.dto.BatchHdrDTO;
import com.sams.service.BatchHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-batch-hdrs")
@RequiredArgsConstructor
public class BatchHdrController {

    private final BatchHdrService service;

    @PostMapping
    public ResponseEntity<BatchHdrDTO> create(@RequestBody BatchHdrDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BatchHdrDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<BatchHdrDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BatchHdrDTO> update(@PathVariable Long id, @RequestBody BatchHdrDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("BatchHdr deleted successfully!.");
    }
}