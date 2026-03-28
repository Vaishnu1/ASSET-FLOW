package com.sams.controller;

import com.sams.dto.GrnDtlDTO;
import com.sams.service.GrnDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/grn-dtls")
@RequiredArgsConstructor
public class GrnDtlController {

    private final GrnDtlService service;

    @PostMapping
    public ResponseEntity<GrnDtlDTO> create(@RequestBody GrnDtlDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GrnDtlDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<GrnDtlDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<GrnDtlDTO> update(@PathVariable Long id, @RequestBody GrnDtlDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("GrnDtl deleted successfully!.");
    }
}