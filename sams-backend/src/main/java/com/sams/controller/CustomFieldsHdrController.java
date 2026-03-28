package com.sams.controller;

import com.sams.dto.CustomFieldsHdrDTO;
import com.sams.service.CustomFieldsHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-custom-fields-hdrs")
@RequiredArgsConstructor
public class CustomFieldsHdrController {

    private final CustomFieldsHdrService service;

    @PostMapping
    public ResponseEntity<CustomFieldsHdrDTO> create(@RequestBody CustomFieldsHdrDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomFieldsHdrDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<CustomFieldsHdrDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomFieldsHdrDTO> update(@PathVariable Long id, @RequestBody CustomFieldsHdrDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("CustomFieldsHdr deleted successfully!.");
    }
}