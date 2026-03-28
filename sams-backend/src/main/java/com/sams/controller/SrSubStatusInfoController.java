package com.sams.controller;

import com.sams.dto.SrSubStatusInfoDTO;
import com.sams.service.SrSubStatusInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/sr-sub-status-infos")
@RequiredArgsConstructor
public class SrSubStatusInfoController {

    private final SrSubStatusInfoService service;

    @PostMapping
    public ResponseEntity<SrSubStatusInfoDTO> create(@RequestBody SrSubStatusInfoDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SrSubStatusInfoDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SrSubStatusInfoDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SrSubStatusInfoDTO> update(@PathVariable Long id, @RequestBody SrSubStatusInfoDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SrSubStatusInfo deleted successfully!.");
    }
}