package com.sams.controller;

import com.sams.dto.WorkFlowDescriptionDTO;
import com.sams.service.WorkFlowDescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/work-flow-descriptions")
@RequiredArgsConstructor
public class WorkFlowDescriptionController {

    private final WorkFlowDescriptionService service;

    @PostMapping
    public ResponseEntity<WorkFlowDescriptionDTO> create(@RequestBody WorkFlowDescriptionDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkFlowDescriptionDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<WorkFlowDescriptionDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkFlowDescriptionDTO> update(@PathVariable Long id, @RequestBody WorkFlowDescriptionDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("WorkFlowDescription deleted successfully!.");
    }
}