package com.sams.controller;

import com.sams.dto.RtvDtlDTO;
import com.sams.service.RtvDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/rtv-dtls")
@RequiredArgsConstructor
public class RtvDtlController {

    private final RtvDtlService service;

    @PostMapping
    public ResponseEntity<RtvDtlDTO> create(@RequestBody RtvDtlDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RtvDtlDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<RtvDtlDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<RtvDtlDTO> update(@PathVariable Long id, @RequestBody RtvDtlDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("RtvDtl deleted successfully!.");
    }
}