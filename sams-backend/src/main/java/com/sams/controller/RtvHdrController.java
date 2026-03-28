package com.sams.controller;

import com.sams.dto.RtvHdrDTO;
import com.sams.service.RtvHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/rtv-hdrs")
@RequiredArgsConstructor
public class RtvHdrController {

    private final RtvHdrService service;

    @PostMapping
    public ResponseEntity<RtvHdrDTO> create(@RequestBody RtvHdrDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RtvHdrDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<RtvHdrDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<RtvHdrDTO> update(@PathVariable Long id, @RequestBody RtvHdrDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("RtvHdr deleted successfully!.");
    }
}