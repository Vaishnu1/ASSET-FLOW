package com.sams.controller;

import com.sams.dto.CustFieldDtlDTO;
import com.sams.service.CustFieldDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-cust-field-dtls")
@RequiredArgsConstructor
public class CustFieldDtlController {

    private final CustFieldDtlService service;

    @PostMapping
    public ResponseEntity<CustFieldDtlDTO> create(@RequestBody CustFieldDtlDTO dto) {
        return new ResponseEntity<>(service.createCustFieldDtl(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustFieldDtlDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getCustFieldDtlById(id));
    }

    @GetMapping
    public ResponseEntity<List<CustFieldDtlDTO>> getAll() {
        return ResponseEntity.ok(service.getAllCustFieldDtls());
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustFieldDtlDTO> update(@PathVariable Long id, @RequestBody CustFieldDtlDTO dto) {
        return ResponseEntity.ok(service.updateCustFieldDtl(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteCustFieldDtl(id);
        return ResponseEntity.ok("CustFieldDtl deleted successfully!.");
    }
}