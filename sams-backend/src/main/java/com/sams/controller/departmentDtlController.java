package com.sams.controller;

import com.sams.dto.departmentDtlDTO;
import com.sams.service.departmentDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/department-dtls")
@RequiredArgsConstructor
public class departmentDtlController {

    private final departmentDtlService service;

    @PostMapping
    public ResponseEntity<departmentDtlDTO> create(@RequestBody departmentDtlDTO dto) {
        return new ResponseEntity<>(service.createdepartmentDtl(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<departmentDtlDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getdepartmentDtlById(id));
    }

    @GetMapping
    public ResponseEntity<List<departmentDtlDTO>> getAll() {
        return ResponseEntity.ok(service.getAlldepartmentDtls());
    }

    @PutMapping("/{id}")
    public ResponseEntity<departmentDtlDTO> update(@PathVariable Long id, @RequestBody departmentDtlDTO dto) {
        return ResponseEntity.ok(service.updatedepartmentDtl(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deletedepartmentDtl(id);
        return ResponseEntity.ok("departmentDtl deleted successfully!.");
    }
}