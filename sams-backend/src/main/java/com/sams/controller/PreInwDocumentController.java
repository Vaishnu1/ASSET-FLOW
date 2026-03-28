package com.sams.controller;

import com.sams.dto.PreInwDocumentDTO;
import com.sams.service.PreInwDocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/pre-inw-documents")
@RequiredArgsConstructor
public class PreInwDocumentController {

    private final PreInwDocumentService service;

    @PostMapping
    public ResponseEntity<PreInwDocumentDTO> create(@RequestBody PreInwDocumentDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PreInwDocumentDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PreInwDocumentDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PreInwDocumentDTO> update(@PathVariable Long id, @RequestBody PreInwDocumentDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("PreInwDocument deleted successfully!.");
    }
}