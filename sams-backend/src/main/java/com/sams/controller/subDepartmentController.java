package com.sams.controller;

import com.sams.dto.subDepartmentDTO;
import com.sams.service.subDepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/sub-departments")
@RequiredArgsConstructor
public class subDepartmentController {

    private final subDepartmentService service;

    @PostMapping
    public ResponseEntity<subDepartmentDTO> create(@RequestBody subDepartmentDTO dto) {
        return new ResponseEntity<>(service.createsubDepartment(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<subDepartmentDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getsubDepartmentById(id));
    }

    @GetMapping
    public ResponseEntity<List<subDepartmentDTO>> getAll() {
        return ResponseEntity.ok(service.getAllsubDepartments());
    }

    @PutMapping("/{id}")
    public ResponseEntity<subDepartmentDTO> update(@PathVariable Long id, @RequestBody subDepartmentDTO dto) {
        return ResponseEntity.ok(service.updatesubDepartment(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deletesubDepartment(id);
        return ResponseEntity.ok("subDepartment deleted successfully!.");
    }
}