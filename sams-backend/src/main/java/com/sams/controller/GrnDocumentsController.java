package com.sams.controller;

import com.sams.dto.GrnDocumentsDTO;
import com.sams.service.GrnDocumentsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/grn-documentses")
@RequiredArgsConstructor
public class GrnDocumentsController {

    private final GrnDocumentsService service;

    @PostMapping
    public ResponseEntity<GrnDocumentsDTO> create(@RequestBody GrnDocumentsDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GrnDocumentsDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<GrnDocumentsDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<GrnDocumentsDTO> update(@PathVariable Long id, @RequestBody GrnDocumentsDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("GrnDocuments deleted successfully!.");
    }
}