package com.sams.controller;

import com.sams.dto.SrActivityCorrectActionsDTO;
import com.sams.service.SrActivityCorrectActionsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-sr-activity-correct-actionses")
@RequiredArgsConstructor
public class SrActivityCorrectActionsController {

    private final SrActivityCorrectActionsService service;

    @PostMapping
    public ResponseEntity<SrActivityCorrectActionsDTO> create(@RequestBody SrActivityCorrectActionsDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SrActivityCorrectActionsDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SrActivityCorrectActionsDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SrActivityCorrectActionsDTO> update(@PathVariable Long id, @RequestBody SrActivityCorrectActionsDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SrActivityCorrectActions deleted successfully!.");
    }
}