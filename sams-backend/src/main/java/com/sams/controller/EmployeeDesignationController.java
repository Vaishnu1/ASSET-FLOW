package com.sams.controller;

import com.sams.dto.EmployeeDesignationDTO;
import com.sams.service.EmployeeDesignationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-employee-designations")
@RequiredArgsConstructor
public class EmployeeDesignationController {

    private final EmployeeDesignationService service;

    @PostMapping
    public ResponseEntity<EmployeeDesignationDTO> create(@RequestBody EmployeeDesignationDTO dto) {
        return new ResponseEntity<>(service.createEmployeeDesignation(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDesignationDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getEmployeeDesignationById(id));
    }

    @GetMapping
    public ResponseEntity<List<EmployeeDesignationDTO>> getAll() {
        return ResponseEntity.ok(service.getAllEmployeeDesignations());
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDesignationDTO> update(@PathVariable Long id, @RequestBody EmployeeDesignationDTO dto) {
        return ResponseEntity.ok(service.updateEmployeeDesignation(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteEmployeeDesignation(id);
        return ResponseEntity.ok("EmployeeDesignation deleted successfully!.");
    }
}