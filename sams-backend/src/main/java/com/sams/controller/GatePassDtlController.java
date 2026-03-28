package com.sams.controller;

import com.sams.dto.GatePassDtlDTO;
import com.sams.service.GatePassDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/gate-pass-dtls")
@RequiredArgsConstructor
public class GatePassDtlController {

    private final GatePassDtlService service;

    @PostMapping
    public ResponseEntity<GatePassDtlDTO> create(@RequestBody GatePassDtlDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GatePassDtlDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<GatePassDtlDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<GatePassDtlDTO> update(@PathVariable Long id, @RequestBody GatePassDtlDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("GatePassDtl deleted successfully!.");
    }
}