package com.sams.controller;

import com.sams.dto.LocSubDepartmentDTO;
import com.sams.service.LocSubDepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-loc-sub-departments")
@RequiredArgsConstructor
public class LocSubDepartmentController {

    private final LocSubDepartmentService service;

    @PostMapping
    public ResponseEntity<LocSubDepartmentDTO> create(@RequestBody LocSubDepartmentDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocSubDepartmentDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<LocSubDepartmentDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<LocSubDepartmentDTO> update(@PathVariable Long id, @RequestBody LocSubDepartmentDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("LocSubDepartment deleted successfully!.");
    }
}