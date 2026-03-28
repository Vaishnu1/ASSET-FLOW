package com.sams.controller;

import com.sams.dto.EmailMessageDTO;
import com.sams.service.EmailMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/email-messages")
@RequiredArgsConstructor
public class EmailMessageController {

    private final EmailMessageService service;

    @PostMapping
    public ResponseEntity<EmailMessageDTO> create(@RequestBody EmailMessageDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmailMessageDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<EmailMessageDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmailMessageDTO> update(@PathVariable Long id, @RequestBody EmailMessageDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("EmailMessage deleted successfully!.");
    }
}