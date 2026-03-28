package com.sams.controller;

import com.sams.dto.ParameterGroupDTO;
import com.sams.service.ParameterGroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-parameter-groups")
@RequiredArgsConstructor
public class ParameterGroupController {

    private final ParameterGroupService service;

    @PostMapping
    public ResponseEntity<ParameterGroupDTO> create(@RequestBody ParameterGroupDTO dto) {
        return new ResponseEntity<>(service.createParameterGroup(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ParameterGroupDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getParameterGroupById(id));
    }

    @GetMapping
    public ResponseEntity<List<ParameterGroupDTO>> getAll() {
        return ResponseEntity.ok(service.getAllParameterGroups());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ParameterGroupDTO> update(@PathVariable Long id, @RequestBody ParameterGroupDTO dto) {
        return ResponseEntity.ok(service.updateParameterGroup(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteParameterGroup(id);
        return ResponseEntity.ok("ParameterGroup deleted successfully!.");
    }
}