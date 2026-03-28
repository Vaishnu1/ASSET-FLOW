package com.sams.controller;

import com.sams.dto.SrHandOverInfoDTO;
import com.sams.service.SrHandOverInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/sr-hand-over-infos")
@RequiredArgsConstructor
public class SrHandOverInfoController {

    private final SrHandOverInfoService service;

    @PostMapping
    public ResponseEntity<SrHandOverInfoDTO> create(@RequestBody SrHandOverInfoDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SrHandOverInfoDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SrHandOverInfoDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SrHandOverInfoDTO> update(@PathVariable Long id, @RequestBody SrHandOverInfoDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SrHandOverInfo deleted successfully!.");
    }
}