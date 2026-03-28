package com.sams.controller;

import com.sams.dto.ContractPaymentTenureDTO;
import com.sams.service.ContractPaymentTenureService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/contract-payment-tenures")
@RequiredArgsConstructor
public class ContractPaymentTenureController {

    private final ContractPaymentTenureService service;

    @PostMapping
    public ResponseEntity<ContractPaymentTenureDTO> create(@RequestBody ContractPaymentTenureDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContractPaymentTenureDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ContractPaymentTenureDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContractPaymentTenureDTO> update(@PathVariable Long id, @RequestBody ContractPaymentTenureDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("ContractPaymentTenure deleted successfully!.");
    }
}