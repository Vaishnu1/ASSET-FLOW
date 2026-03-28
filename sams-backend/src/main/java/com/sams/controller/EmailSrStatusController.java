package com.sams.controller;

import com.sams.dto.EmailSrStatusDTO;
import com.sams.service.EmailSrStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/email-sr-statuses")
@RequiredArgsConstructor
public class EmailSrStatusController {

    private final EmailSrStatusService service;

    @PostMapping
    public ResponseEntity<EmailSrStatusDTO> create(@RequestBody EmailSrStatusDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmailSrStatusDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<EmailSrStatusDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmailSrStatusDTO> update(@PathVariable Long id, @RequestBody EmailSrStatusDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("EmailSrStatus deleted successfully!.");
    }
}