package com.sams.controller;

import com.sams.dto.DesignationDTO;
import com.sams.service.DesignationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-designations")
@RequiredArgsConstructor
public class DesignationController {

    private final DesignationService service;

    @PostMapping
    public ResponseEntity<DesignationDTO> create(@RequestBody DesignationDTO dto) {
        return new ResponseEntity<>(service.createDesignation(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DesignationDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getDesignationById(id));
    }

    @GetMapping
    public ResponseEntity<List<DesignationDTO>> getAll() {
        return ResponseEntity.ok(service.getAllDesignations());
    }

    @PutMapping("/{id}")
    public ResponseEntity<DesignationDTO> update(@PathVariable Long id, @RequestBody DesignationDTO dto) {
        return ResponseEntity.ok(service.updateDesignation(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteDesignation(id);
        return ResponseEntity.ok("Designation deleted successfully!.");
    }
}