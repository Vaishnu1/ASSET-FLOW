package com.sams.controller;

import com.sams.dto.GatePassPurposeDTO;
import com.sams.service.GatePassPurposeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/gate-pass-purposes")
@RequiredArgsConstructor
public class GatePassPurposeController {

    private final GatePassPurposeService service;

    @PostMapping
    public ResponseEntity<GatePassPurposeDTO> create(@RequestBody GatePassPurposeDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GatePassPurposeDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<GatePassPurposeDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<GatePassPurposeDTO> update(@PathVariable Long id, @RequestBody GatePassPurposeDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("GatePassPurpose deleted successfully!.");
    }
}