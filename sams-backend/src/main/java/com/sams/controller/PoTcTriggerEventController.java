package com.sams.controller;

import com.sams.dto.PoTcTriggerEventDTO;
import com.sams.service.PoTcTriggerEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-po-tc-trigger-events")
@RequiredArgsConstructor
public class PoTcTriggerEventController {

    private final PoTcTriggerEventService service;

    @PostMapping
    public ResponseEntity<PoTcTriggerEventDTO> create(@RequestBody PoTcTriggerEventDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PoTcTriggerEventDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PoTcTriggerEventDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PoTcTriggerEventDTO> update(@PathVariable Long id, @RequestBody PoTcTriggerEventDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("PoTcTriggerEvent deleted successfully!.");
    }
}