package com.sams.controller;

import com.sams.dto.ProcessStatusDTO;
import com.sams.service.ProcessStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-process-statuses")
@RequiredArgsConstructor
public class ProcessStatusController {

    private final ProcessStatusService service;

    @PostMapping
    public ResponseEntity<ProcessStatusDTO> create(@RequestBody ProcessStatusDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProcessStatusDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ProcessStatusDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProcessStatusDTO> update(@PathVariable Long id, @RequestBody ProcessStatusDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("ProcessStatus deleted successfully!.");
    }
}