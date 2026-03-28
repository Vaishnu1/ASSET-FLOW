package com.sams.controller;

import com.sams.dto.AssigneeTypeDTO;
import com.sams.service.AssigneeTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/assignee-types")
@RequiredArgsConstructor
public class AssigneeTypeController {

    private final AssigneeTypeService service;

    @PostMapping
    public ResponseEntity<AssigneeTypeDTO> create(@RequestBody AssigneeTypeDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssigneeTypeDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssigneeTypeDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssigneeTypeDTO> update(@PathVariable Long id, @RequestBody AssigneeTypeDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("AssigneeType deleted successfully!.");
    }
}