package com.sams.controller;

import com.sams.dto.RcvHdrDTO;
import com.sams.service.RcvHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/rcv-hdrs")
@RequiredArgsConstructor
public class RcvHdrController {

    private final RcvHdrService service;

    @PostMapping
    public ResponseEntity<RcvHdrDTO> create(@RequestBody RcvHdrDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RcvHdrDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<RcvHdrDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<RcvHdrDTO> update(@PathVariable Long id, @RequestBody RcvHdrDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("RcvHdr deleted successfully!.");
    }
}