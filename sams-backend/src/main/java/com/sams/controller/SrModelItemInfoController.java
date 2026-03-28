package com.sams.controller;

import com.sams.dto.SrModelItemInfoDTO;
import com.sams.service.SrModelItemInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/sr-model-item-infos")
@RequiredArgsConstructor
public class SrModelItemInfoController {

    private final SrModelItemInfoService service;

    @PostMapping
    public ResponseEntity<SrModelItemInfoDTO> create(@RequestBody SrModelItemInfoDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SrModelItemInfoDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SrModelItemInfoDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SrModelItemInfoDTO> update(@PathVariable Long id, @RequestBody SrModelItemInfoDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("SrModelItemInfo deleted successfully!.");
    }
}