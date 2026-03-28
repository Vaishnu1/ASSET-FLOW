package com.sams.controller;

import com.sams.dto.SmsMessageDtlDTO;
import com.sams.service.SmsMessageDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/sms-message-dtls")
@RequiredArgsConstructor
public class SmsMessageDtlController {

    private final SmsMessageDtlService service;

    @PostMapping
    public ResponseEntity<SmsMessageDtlDTO> create(@RequestBody SmsMessageDtlDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SmsMessageDtlDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SmsMessageDtlDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SmsMessageDtlDTO> update(@PathVariable Long id, @RequestBody SmsMessageDtlDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SmsMessageDtl deleted successfully!.");
    }
}