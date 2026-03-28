package com.sams.controller;

import com.sams.dto.AccConDTO;
import com.sams.service.AccConService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-acc-cons")
@RequiredArgsConstructor
public class AccConController {

    private final AccConService service;

    @PostMapping
    public ResponseEntity<AccConDTO> create(@RequestBody AccConDTO dto) {
        return new ResponseEntity<>(service.createAccCon(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccConDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAccConById(id));
    }

    @GetMapping
    public ResponseEntity<List<AccConDTO>> getAll() {
        return ResponseEntity.ok(service.getAllAccCons());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AccConDTO> update(@PathVariable Long id, @RequestBody AccConDTO dto) {
        return ResponseEntity.ok(service.updateAccCon(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteAccCon(id);
        return ResponseEntity.ok("AccCon deleted successfully!.");
    }
}