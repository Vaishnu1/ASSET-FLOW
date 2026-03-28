package com.sams.controller;

import com.sams.dto.EmailReminderScheduleDtlDTO;
import com.sams.service.EmailReminderScheduleDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/email-reminder-schedule-dtls")
@RequiredArgsConstructor
public class EmailReminderScheduleDtlController {

    private final EmailReminderScheduleDtlService service;

    @PostMapping
    public ResponseEntity<EmailReminderScheduleDtlDTO> create(@RequestBody EmailReminderScheduleDtlDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmailReminderScheduleDtlDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<EmailReminderScheduleDtlDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmailReminderScheduleDtlDTO> update(@PathVariable Long id, @RequestBody EmailReminderScheduleDtlDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("EmailReminderScheduleDtl deleted successfully!.");
    }
}