package com.sams.controller;

import com.sams.dto.SmsInformationDTO;
import com.sams.service.SmsInformationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/sms-informations")
@RequiredArgsConstructor
public class SmsInformationController {

    private final SmsInformationService service;

    @PostMapping
    public ResponseEntity<SmsInformationDTO> create(@RequestBody SmsInformationDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SmsInformationDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SmsInformationDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SmsInformationDTO> update(@PathVariable Long id, @RequestBody SmsInformationDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SmsInformation deleted successfully!.");
    }
}