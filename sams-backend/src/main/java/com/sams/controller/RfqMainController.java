package com.sams.controller;

import com.sams.dto.RfqMainDTO;
import com.sams.service.RfqMainService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/rfq-mains")
@RequiredArgsConstructor
public class RfqMainController {

    private final RfqMainService service;

    @PostMapping
    public ResponseEntity<RfqMainDTO> create(@RequestBody RfqMainDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RfqMainDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<RfqMainDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<RfqMainDTO> update(@PathVariable Long id, @RequestBody RfqMainDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("RfqMain deleted successfully!.");
    }
}