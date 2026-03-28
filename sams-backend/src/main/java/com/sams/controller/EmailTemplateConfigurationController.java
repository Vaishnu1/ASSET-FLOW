package com.sams.controller;

import com.sams.dto.EmailTemplateConfigurationDTO;
import com.sams.service.EmailTemplateConfigurationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/email-template-configurations")
@RequiredArgsConstructor
public class EmailTemplateConfigurationController {

    private final EmailTemplateConfigurationService service;

    @PostMapping
    public ResponseEntity<EmailTemplateConfigurationDTO> create(@RequestBody EmailTemplateConfigurationDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmailTemplateConfigurationDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<EmailTemplateConfigurationDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmailTemplateConfigurationDTO> update(@PathVariable Long id, @RequestBody EmailTemplateConfigurationDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("EmailTemplateConfiguration deleted successfully!.");
    }
}