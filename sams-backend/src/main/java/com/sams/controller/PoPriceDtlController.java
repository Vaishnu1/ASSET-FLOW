package com.sams.controller;

import com.sams.dto.PoPriceDtlDTO;
import com.sams.service.PoPriceDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-po-price-dtls")
@RequiredArgsConstructor
public class PoPriceDtlController {

    private final PoPriceDtlService service;

    @PostMapping
    public ResponseEntity<PoPriceDtlDTO> create(@RequestBody PoPriceDtlDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PoPriceDtlDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PoPriceDtlDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PoPriceDtlDTO> update(@PathVariable Long id, @RequestBody PoPriceDtlDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("PoPriceDtl deleted successfully!.");
    }
}