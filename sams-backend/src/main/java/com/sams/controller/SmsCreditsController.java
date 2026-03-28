package com.sams.controller;

import com.sams.dto.SmsCreditsDTO;
import com.sams.service.SmsCreditsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-sms-creditses")
@RequiredArgsConstructor
public class SmsCreditsController {

    private final SmsCreditsService service;

    @PostMapping
    public ResponseEntity<SmsCreditsDTO> create(@RequestBody SmsCreditsDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SmsCreditsDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SmsCreditsDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SmsCreditsDTO> update(@PathVariable Long id, @RequestBody SmsCreditsDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SmsCredits deleted successfully!.");
    }
}