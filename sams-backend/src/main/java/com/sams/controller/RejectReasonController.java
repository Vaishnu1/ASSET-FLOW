package com.sams.controller;

import com.sams.dto.RejectReasonDTO;
import com.sams.service.RejectReasonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-reject-reasons")
@RequiredArgsConstructor
public class RejectReasonController {

    private final RejectReasonService service;

    @PostMapping
    public ResponseEntity<RejectReasonDTO> create(@RequestBody RejectReasonDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RejectReasonDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<RejectReasonDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<RejectReasonDTO> update(@PathVariable Long id, @RequestBody RejectReasonDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("RejectReason deleted successfully!.");
    }
}