package com.sams.controller;

import com.sams.dto.PoTcInfoDTO;
import com.sams.service.PoTcInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/po-tc-infos")
@RequiredArgsConstructor
public class PoTcInfoController {

    private final PoTcInfoService service;

    @PostMapping
    public ResponseEntity<PoTcInfoDTO> create(@RequestBody PoTcInfoDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PoTcInfoDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PoTcInfoDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PoTcInfoDTO> update(@PathVariable Long id, @RequestBody PoTcInfoDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("PoTcInfo deleted successfully!.");
    }
}