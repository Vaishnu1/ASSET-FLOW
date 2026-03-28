package com.sams.controller;

import com.sams.dto.ApPaymentDTO;
import com.sams.service.ApPaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/ap-payments")
@RequiredArgsConstructor
public class ApPaymentController {

    private final ApPaymentService service;

    @PostMapping
    public ResponseEntity<ApPaymentDTO> create(@RequestBody ApPaymentDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApPaymentDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ApPaymentDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApPaymentDTO> update(@PathVariable Long id, @RequestBody ApPaymentDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("ApPayment deleted successfully!.");
    }
}