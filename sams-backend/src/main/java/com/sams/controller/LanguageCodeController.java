package com.sams.controller;

import com.sams.dto.LanguageCodeDTO;
import com.sams.service.LanguageCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-language-codes")
@RequiredArgsConstructor
public class LanguageCodeController {

    private final LanguageCodeService service;

    @PostMapping
    public ResponseEntity<LanguageCodeDTO> create(@RequestBody LanguageCodeDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LanguageCodeDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<LanguageCodeDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<LanguageCodeDTO> update(@PathVariable Long id, @RequestBody LanguageCodeDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("LanguageCode deleted successfully!.");
    }
}