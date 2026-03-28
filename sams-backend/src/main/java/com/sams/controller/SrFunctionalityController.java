package com.sams.controller;

import com.sams.dto.SrFunctionalityDTO;
import com.sams.service.SrFunctionalityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-sr-functionalities")
@RequiredArgsConstructor
public class SrFunctionalityController {

    private final SrFunctionalityService service;

    @PostMapping
    public ResponseEntity<SrFunctionalityDTO> create(@RequestBody SrFunctionalityDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SrFunctionalityDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SrFunctionalityDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SrFunctionalityDTO> update(@PathVariable Long id, @RequestBody SrFunctionalityDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SrFunctionality deleted successfully!.");
    }
}