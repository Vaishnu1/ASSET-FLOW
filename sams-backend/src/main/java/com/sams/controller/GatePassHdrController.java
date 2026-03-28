package com.sams.controller;

import com.sams.dto.GatePassHdrDTO;
import com.sams.service.GatePassHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/gate-pass-hdrs")
@RequiredArgsConstructor
public class GatePassHdrController {

    private final GatePassHdrService service;

    @PostMapping
    public ResponseEntity<GatePassHdrDTO> create(@RequestBody GatePassHdrDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GatePassHdrDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<GatePassHdrDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<GatePassHdrDTO> update(@PathVariable Long id, @RequestBody GatePassHdrDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("GatePassHdr deleted successfully!.");
    }
}