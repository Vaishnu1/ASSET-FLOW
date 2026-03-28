package com.sams.controller;

import com.sams.dto.ContractHeaderDTO;
import com.sams.service.ContractHeaderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-contract-headers")
@RequiredArgsConstructor
public class ContractHeaderController {

    private final ContractHeaderService service;

    @PostMapping
    public ResponseEntity<ContractHeaderDTO> create(@RequestBody ContractHeaderDTO dto) {
        return new ResponseEntity<>(service.createContractHeader(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContractHeaderDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getContractHeaderById(id));
    }

    @GetMapping
    public ResponseEntity<List<ContractHeaderDTO>> getAll() {
        return ResponseEntity.ok(service.getAllContractHeaders());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContractHeaderDTO> update(@PathVariable Long id, @RequestBody ContractHeaderDTO dto) {
        return ResponseEntity.ok(service.updateContractHeader(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteContractHeader(id);
        return ResponseEntity.ok("ContractHeader deleted successfully!.");
    }
}