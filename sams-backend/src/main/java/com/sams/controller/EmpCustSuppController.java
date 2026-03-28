package com.sams.controller;

import com.sams.dto.EmpCustSuppDTO;
import com.sams.service.EmpCustSuppService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-emp-cust-supps")
@RequiredArgsConstructor
public class EmpCustSuppController {

    private final EmpCustSuppService service;

    @PostMapping
    public ResponseEntity<EmpCustSuppDTO> create(@RequestBody EmpCustSuppDTO dto) {
        return new ResponseEntity<>(service.createEmpCustSupp(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmpCustSuppDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getEmpCustSuppById(id));
    }

    @GetMapping
    public ResponseEntity<List<EmpCustSuppDTO>> getAll() {
        return ResponseEntity.ok(service.getAllEmpCustSupps());
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmpCustSuppDTO> update(@PathVariable Long id, @RequestBody EmpCustSuppDTO dto) {
        return ResponseEntity.ok(service.updateEmpCustSupp(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteEmpCustSupp(id);
        return ResponseEntity.ok("EmpCustSupp deleted successfully!.");
    }
}