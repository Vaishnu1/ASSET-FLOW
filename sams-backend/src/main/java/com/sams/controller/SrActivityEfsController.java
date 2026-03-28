package com.sams.controller;

import com.sams.dto.SrActivityEfsDTO;
import com.sams.service.SrActivityEfsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-sr-activity-efses")
@RequiredArgsConstructor
public class SrActivityEfsController {

    private final SrActivityEfsService service;

    @PostMapping
    public ResponseEntity<SrActivityEfsDTO> create(@RequestBody SrActivityEfsDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SrActivityEfsDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SrActivityEfsDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SrActivityEfsDTO> update(@PathVariable Long id, @RequestBody SrActivityEfsDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SrActivityEfs deleted successfully!.");
    }
}