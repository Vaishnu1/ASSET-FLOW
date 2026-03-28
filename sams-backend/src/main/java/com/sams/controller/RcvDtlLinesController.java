package com.sams.controller;

import com.sams.dto.RcvDtlLinesDTO;
import com.sams.service.RcvDtlLinesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/rcv-dtl-lineses")
@RequiredArgsConstructor
public class RcvDtlLinesController {

    private final RcvDtlLinesService service;

    @PostMapping
    public ResponseEntity<RcvDtlLinesDTO> create(@RequestBody RcvDtlLinesDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RcvDtlLinesDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<RcvDtlLinesDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<RcvDtlLinesDTO> update(@PathVariable Long id, @RequestBody RcvDtlLinesDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("RcvDtlLines deleted successfully!.");
    }
}