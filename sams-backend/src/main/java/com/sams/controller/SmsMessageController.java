package com.sams.controller;

import com.sams.dto.SmsMessageDTO;
import com.sams.service.SmsMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/sms-messages")
@RequiredArgsConstructor
public class SmsMessageController {

    private final SmsMessageService service;

    @PostMapping
    public ResponseEntity<SmsMessageDTO> create(@RequestBody SmsMessageDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SmsMessageDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SmsMessageDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SmsMessageDTO> update(@PathVariable Long id, @RequestBody SmsMessageDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SmsMessage deleted successfully!.");
    }
}