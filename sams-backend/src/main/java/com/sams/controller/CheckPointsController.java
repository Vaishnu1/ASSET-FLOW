package com.sams.controller;

import com.sams.dto.CheckPointsDTO;
import com.sams.service.CheckPointsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-check-pointses")
@RequiredArgsConstructor
public class CheckPointsController {

    private final CheckPointsService service;

    @PostMapping
    public ResponseEntity<CheckPointsDTO> create(@RequestBody CheckPointsDTO dto) {
        return new ResponseEntity<>(service.createCheckPoints(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CheckPointsDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getCheckPointsById(id));
    }

    @GetMapping
    public ResponseEntity<List<CheckPointsDTO>> getAll() {
        return ResponseEntity.ok(service.getAllCheckPointses());
    }

    @PutMapping("/{id}")
    public ResponseEntity<CheckPointsDTO> update(@PathVariable Long id, @RequestBody CheckPointsDTO dto) {
        return ResponseEntity.ok(service.updateCheckPoints(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteCheckPoints(id);
        return ResponseEntity.ok("CheckPoints deleted successfully!.");
    }
}