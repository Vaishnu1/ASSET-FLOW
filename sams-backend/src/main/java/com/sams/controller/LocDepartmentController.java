package com.sams.controller;

import com.sams.dto.LocDepartmentDTO;
import com.sams.service.LocDepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-loc-departments")
@RequiredArgsConstructor
public class LocDepartmentController {

    private final LocDepartmentService service;

    @PostMapping
    public ResponseEntity<LocDepartmentDTO> create(@RequestBody LocDepartmentDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocDepartmentDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<LocDepartmentDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<LocDepartmentDTO> update(@PathVariable Long id, @RequestBody LocDepartmentDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("LocDepartment deleted successfully!.");
    }
}