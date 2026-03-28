package com.sams.controller;

import com.sams.dto.EmailVariableConfigDTO;
import com.sams.service.EmailVariableConfigService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/email-variable-configs")
@RequiredArgsConstructor
public class EmailVariableConfigController {

    private final EmailVariableConfigService service;

    @PostMapping
    public ResponseEntity<EmailVariableConfigDTO> create(@RequestBody EmailVariableConfigDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmailVariableConfigDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<EmailVariableConfigDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmailVariableConfigDTO> update(@PathVariable Long id, @RequestBody EmailVariableConfigDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("EmailVariableConfig deleted successfully!.");
    }
}