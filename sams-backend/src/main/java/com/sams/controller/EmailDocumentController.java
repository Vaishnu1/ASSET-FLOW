package com.sams.controller;

import com.sams.dto.EmailDocumentDTO;
import com.sams.service.EmailDocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/email-documents")
@RequiredArgsConstructor
public class EmailDocumentController {

    private final EmailDocumentService service;

    @PostMapping
    public ResponseEntity<EmailDocumentDTO> create(@RequestBody EmailDocumentDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmailDocumentDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<EmailDocumentDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmailDocumentDTO> update(@PathVariable Long id, @RequestBody EmailDocumentDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("EmailDocument deleted successfully!.");
    }
}