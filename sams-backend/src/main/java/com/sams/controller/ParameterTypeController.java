package com.sams.controller;

import com.sams.dto.ParameterTypeDTO;
import com.sams.service.ParameterTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-parameter-types")
@RequiredArgsConstructor
public class ParameterTypeController {

    private final ParameterTypeService service;

    @PostMapping
    public ResponseEntity<ParameterTypeDTO> create(@RequestBody ParameterTypeDTO dto) {
        return new ResponseEntity<>(service.createParameterType(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ParameterTypeDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getParameterTypeById(id));
    }

    @GetMapping
    public ResponseEntity<List<ParameterTypeDTO>> getAll() {
        return ResponseEntity.ok(service.getAllParameterTypes());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ParameterTypeDTO> update(@PathVariable Long id, @RequestBody ParameterTypeDTO dto) {
        return ResponseEntity.ok(service.updateParameterType(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteParameterType(id);
        return ResponseEntity.ok("ParameterType deleted successfully!.");
    }
}