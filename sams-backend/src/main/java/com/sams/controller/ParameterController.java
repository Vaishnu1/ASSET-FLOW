package com.sams.controller;

import com.sams.dto.ParameterDTO;
import com.sams.service.ParameterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-parameters")
@RequiredArgsConstructor
public class ParameterController {

    private final ParameterService service;

    @PostMapping
    public ResponseEntity<ParameterDTO> create(@RequestBody ParameterDTO dto) {
        return new ResponseEntity<>(service.createParameter(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ParameterDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getParameterById(id));
    }

    @GetMapping
    public ResponseEntity<List<ParameterDTO>> getAll() {
        return ResponseEntity.ok(service.getAllParameters());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ParameterDTO> update(@PathVariable Long id, @RequestBody ParameterDTO dto) {
        return ResponseEntity.ok(service.updateParameter(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteParameter(id);
        return ResponseEntity.ok("Parameter deleted successfully!.");
    }
}