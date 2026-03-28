package com.sams.controller;

import com.sams.dto.VolumeLicenseDTO;
import com.sams.service.VolumeLicenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-volume-licenses")
@RequiredArgsConstructor
public class VolumeLicenseController {

    private final VolumeLicenseService service;

    @PostMapping
    public ResponseEntity<VolumeLicenseDTO> create(@RequestBody VolumeLicenseDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VolumeLicenseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<VolumeLicenseDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<VolumeLicenseDTO> update(@PathVariable Long id, @RequestBody VolumeLicenseDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("VolumeLicense deleted successfully!.");
    }
}