package com.sams.controller;

import com.sams.dto.NumberControlCdDTO;
import com.sams.service.NumberControlCdService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-number-control-cds")
@RequiredArgsConstructor
public class NumberControlCdController {

    private final NumberControlCdService service;

    @PostMapping
    public ResponseEntity<NumberControlCdDTO> create(@RequestBody NumberControlCdDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NumberControlCdDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<NumberControlCdDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<NumberControlCdDTO> update(@PathVariable Long id, @RequestBody NumberControlCdDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("NumberControlCd deleted successfully!.");
    }
}