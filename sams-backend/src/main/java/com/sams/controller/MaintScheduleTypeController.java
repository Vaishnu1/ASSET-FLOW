package com.sams.controller;

import com.sams.dto.MaintScheduleTypeDTO;
import com.sams.service.MaintScheduleTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-maint-schedule-types")
@RequiredArgsConstructor
public class MaintScheduleTypeController {

    private final MaintScheduleTypeService service;

    @PostMapping
    public ResponseEntity<MaintScheduleTypeDTO> create(@RequestBody MaintScheduleTypeDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MaintScheduleTypeDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<MaintScheduleTypeDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<MaintScheduleTypeDTO> update(@PathVariable Long id, @RequestBody MaintScheduleTypeDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("MaintScheduleType deleted successfully!.");
    }
}