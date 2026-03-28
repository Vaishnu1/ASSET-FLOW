package com.sams.controller;

import com.sams.dto.PreInwStatusDTO;
import com.sams.service.PreInwStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-pre-inw-statuses")
@RequiredArgsConstructor
public class PreInwStatusController {

    private final PreInwStatusService service;

    @PostMapping
    public ResponseEntity<PreInwStatusDTO> create(@RequestBody PreInwStatusDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PreInwStatusDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PreInwStatusDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PreInwStatusDTO> update(@PathVariable Long id, @RequestBody PreInwStatusDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("PreInwStatus deleted successfully!.");
    }
}