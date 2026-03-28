package com.sams.controller;

import com.sams.dto.SmsMessageHdrDTO;
import com.sams.service.SmsMessageHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/sms-message-hdrs")
@RequiredArgsConstructor
public class SmsMessageHdrController {

    private final SmsMessageHdrService service;

    @PostMapping
    public ResponseEntity<SmsMessageHdrDTO> create(@RequestBody SmsMessageHdrDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SmsMessageHdrDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SmsMessageHdrDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SmsMessageHdrDTO> update(@PathVariable Long id, @RequestBody SmsMessageHdrDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SmsMessageHdr deleted successfully!.");
    }
}