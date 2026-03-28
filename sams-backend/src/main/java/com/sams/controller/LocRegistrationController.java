package com.sams.controller;

import com.sams.dto.LocRegistrationDTO;
import com.sams.service.LocRegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-loc-registrations")
@RequiredArgsConstructor
public class LocRegistrationController {

    private final LocRegistrationService service;

    @PostMapping
    public ResponseEntity<LocRegistrationDTO> create(@RequestBody LocRegistrationDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocRegistrationDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<LocRegistrationDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<LocRegistrationDTO> update(@PathVariable Long id, @RequestBody LocRegistrationDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("LocRegistration deleted successfully!.");
    }
}