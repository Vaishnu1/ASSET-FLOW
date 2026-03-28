package com.sams.controller;

import com.sams.dto.PurchaseTcTemplateDtlDTO;
import com.sams.service.PurchaseTcTemplateDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-purchase-tc-template-dtls")
@RequiredArgsConstructor
public class PurchaseTcTemplateDtlController {

    private final PurchaseTcTemplateDtlService service;

    @PostMapping
    public ResponseEntity<PurchaseTcTemplateDtlDTO> create(@RequestBody PurchaseTcTemplateDtlDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PurchaseTcTemplateDtlDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PurchaseTcTemplateDtlDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PurchaseTcTemplateDtlDTO> update(@PathVariable Long id, @RequestBody PurchaseTcTemplateDtlDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("PurchaseTcTemplateDtl deleted successfully!.");
    }
}