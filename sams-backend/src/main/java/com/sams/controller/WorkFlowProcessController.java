package com.sams.controller;

import com.sams.dto.WorkFlowProcessDTO;
import com.sams.service.WorkFlowProcessService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/work-flow-processes")
@RequiredArgsConstructor
public class WorkFlowProcessController {

    private final WorkFlowProcessService service;

    @PostMapping
    public ResponseEntity<WorkFlowProcessDTO> create(@RequestBody WorkFlowProcessDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkFlowProcessDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<WorkFlowProcessDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkFlowProcessDTO> update(@PathVariable Long id, @RequestBody WorkFlowProcessDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("WorkFlowProcess deleted successfully!.");
    }
}