package com.sams.controller;

import com.sams.dto.EmailInformationDTO;
import com.sams.service.EmailInformationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/email-informations")
@RequiredArgsConstructor
public class EmailInformationController {

    private final EmailInformationService service;

    @PostMapping
    public ResponseEntity<EmailInformationDTO> create(@RequestBody EmailInformationDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmailInformationDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<EmailInformationDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmailInformationDTO> update(@PathVariable Long id, @RequestBody EmailInformationDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("EmailInformation deleted successfully!.");
    }
}