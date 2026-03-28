package com.sams.controller;

import com.sams.dto.StatusTypeDTO;
import com.sams.service.StatusTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-status-types")
@RequiredArgsConstructor
public class StatusTypeController {

    private final StatusTypeService service;

    @PostMapping
    public ResponseEntity<StatusTypeDTO> create(@RequestBody StatusTypeDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StatusTypeDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<StatusTypeDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<StatusTypeDTO> update(@PathVariable Long id, @RequestBody StatusTypeDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("StatusType deleted successfully!.");
    }
}