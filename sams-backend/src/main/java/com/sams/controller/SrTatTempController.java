package com.sams.controller;

import com.sams.dto.SrTatTempDTO;
import com.sams.service.SrTatTempService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/sr-tat-temps")
@RequiredArgsConstructor
public class SrTatTempController {

    private final SrTatTempService service;

    @PostMapping
    public ResponseEntity<SrTatTempDTO> create(@RequestBody SrTatTempDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SrTatTempDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SrTatTempDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SrTatTempDTO> update(@PathVariable Long id, @RequestBody SrTatTempDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SrTatTemp deleted successfully!.");
    }
}