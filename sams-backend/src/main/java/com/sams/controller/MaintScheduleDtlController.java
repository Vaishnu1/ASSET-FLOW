package com.sams.controller;

import com.sams.dto.MaintScheduleDtlDTO;
import com.sams.service.MaintScheduleDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/maint-schedule-dtls")
@RequiredArgsConstructor
public class MaintScheduleDtlController {

    private final MaintScheduleDtlService service;

    @PostMapping
    public ResponseEntity<MaintScheduleDtlDTO> create(@RequestBody MaintScheduleDtlDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MaintScheduleDtlDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<MaintScheduleDtlDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<MaintScheduleDtlDTO> update(@PathVariable Long id, @RequestBody MaintScheduleDtlDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("MaintScheduleDtl deleted successfully!.");
    }
}