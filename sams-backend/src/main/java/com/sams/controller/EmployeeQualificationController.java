package com.sams.controller;

import com.sams.dto.EmployeeQualificationDTO;
import com.sams.service.EmployeeQualificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-employee-qualifications")
@RequiredArgsConstructor
public class EmployeeQualificationController {

    private final EmployeeQualificationService service;

    @PostMapping
    public ResponseEntity<EmployeeQualificationDTO> create(@RequestBody EmployeeQualificationDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeQualificationDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<EmployeeQualificationDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeQualificationDTO> update(@PathVariable Long id, @RequestBody EmployeeQualificationDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("EmployeeQualification deleted successfully!.");
    }
}