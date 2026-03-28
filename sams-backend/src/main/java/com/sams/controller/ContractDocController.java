package com.sams.controller;

import com.sams.dto.ContractDocDTO;
import com.sams.service.ContractDocService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/contract-docs")
@RequiredArgsConstructor
public class ContractDocController {

    private final ContractDocService service;

    @PostMapping
    public ResponseEntity<ContractDocDTO> create(@RequestBody ContractDocDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContractDocDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ContractDocDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContractDocDTO> update(@PathVariable Long id, @RequestBody ContractDocDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("ContractDoc deleted successfully!.");
    }
}