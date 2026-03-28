package com.sams.controller;

import com.sams.dto.MaintScheduleHdrDTO;
import com.sams.service.MaintScheduleHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/maint-schedule-hdrs")
@RequiredArgsConstructor
public class MaintScheduleHdrController {

    private final MaintScheduleHdrService service;

    @PostMapping
    public ResponseEntity<MaintScheduleHdrDTO> create(@RequestBody MaintScheduleHdrDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MaintScheduleHdrDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<MaintScheduleHdrDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<MaintScheduleHdrDTO> update(@PathVariable Long id, @RequestBody MaintScheduleHdrDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("MaintScheduleHdr deleted successfully!.");
    }
}