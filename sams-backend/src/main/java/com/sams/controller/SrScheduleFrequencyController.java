package com.sams.controller;

import com.sams.dto.SrScheduleFrequencyDTO;
import com.sams.service.SrScheduleFrequencyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-sr-schedule-frequencies")
@RequiredArgsConstructor
public class SrScheduleFrequencyController {

    private final SrScheduleFrequencyService service;

    @PostMapping
    public ResponseEntity<SrScheduleFrequencyDTO> create(@RequestBody SrScheduleFrequencyDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SrScheduleFrequencyDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SrScheduleFrequencyDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SrScheduleFrequencyDTO> update(@PathVariable Long id, @RequestBody SrScheduleFrequencyDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SrScheduleFrequency deleted successfully!.");
    }
}