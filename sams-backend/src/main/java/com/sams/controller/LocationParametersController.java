package com.sams.controller;

import com.sams.dto.LocationParametersDTO;
import com.sams.service.LocationParametersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/location-parameterses")
@RequiredArgsConstructor
public class LocationParametersController {

    private final LocationParametersService service;

    @PostMapping
    public ResponseEntity<LocationParametersDTO> create(@RequestBody LocationParametersDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocationParametersDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<LocationParametersDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<LocationParametersDTO> update(@PathVariable Long id, @RequestBody LocationParametersDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("LocationParameters deleted successfully!.");
    }
}