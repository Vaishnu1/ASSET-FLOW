package com.sams.controller;

import com.sams.dto.WorkFlowRejectDTO;
import com.sams.service.WorkFlowRejectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/work-flow-rejects")
@RequiredArgsConstructor
public class WorkFlowRejectController {

    private final WorkFlowRejectService service;

    @PostMapping
    public ResponseEntity<WorkFlowRejectDTO> create(@RequestBody WorkFlowRejectDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkFlowRejectDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<WorkFlowRejectDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkFlowRejectDTO> update(@PathVariable Long id, @RequestBody WorkFlowRejectDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("WorkFlowReject deleted successfully!.");
    }
}