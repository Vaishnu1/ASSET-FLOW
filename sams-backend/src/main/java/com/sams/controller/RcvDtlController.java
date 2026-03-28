package com.sams.controller;

import com.sams.dto.RcvDtlDTO;
import com.sams.service.RcvDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/rcv-dtls")
@RequiredArgsConstructor
public class RcvDtlController {

    private final RcvDtlService service;

    @PostMapping
    public ResponseEntity<RcvDtlDTO> create(@RequestBody RcvDtlDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RcvDtlDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<RcvDtlDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<RcvDtlDTO> update(@PathVariable Long id, @RequestBody RcvDtlDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("RcvDtl deleted successfully!.");
    }
}