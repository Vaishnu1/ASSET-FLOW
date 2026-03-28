package com.sams.controller;

import com.sams.dto.SrReOpenedDTO;
import com.sams.service.SrReOpenedService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/sr-re-openeds")
@RequiredArgsConstructor
public class SrReOpenedController {

    private final SrReOpenedService service;

    @PostMapping
    public ResponseEntity<SrReOpenedDTO> create(@RequestBody SrReOpenedDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SrReOpenedDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SrReOpenedDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SrReOpenedDTO> update(@PathVariable Long id, @RequestBody SrReOpenedDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SrReOpened deleted successfully!.");
    }
}