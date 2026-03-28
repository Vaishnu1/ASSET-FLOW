package com.sams.controller;

import com.sams.dto.EmployeeAttendanceDTO;
import com.sams.service.EmployeeAttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-employee-attendances")
@RequiredArgsConstructor
public class EmployeeAttendanceController {

    private final EmployeeAttendanceService service;

    @PostMapping
    public ResponseEntity<EmployeeAttendanceDTO> create(@RequestBody EmployeeAttendanceDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeAttendanceDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<EmployeeAttendanceDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeAttendanceDTO> update(@PathVariable Long id, @RequestBody EmployeeAttendanceDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("EmployeeAttendance deleted successfully!.");
    }
}