package com.sams.controller;

import com.sams.dto.WorkFlowHierarchyDtlDTO;
import com.sams.service.WorkFlowHierarchyDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/work-flow-hierarchy-dtls")
@RequiredArgsConstructor
public class WorkFlowHierarchyDtlController {

    private final WorkFlowHierarchyDtlService service;

    @PostMapping
    public ResponseEntity<WorkFlowHierarchyDtlDTO> create(@RequestBody WorkFlowHierarchyDtlDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkFlowHierarchyDtlDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<WorkFlowHierarchyDtlDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkFlowHierarchyDtlDTO> update(@PathVariable Long id, @RequestBody WorkFlowHierarchyDtlDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("WorkFlowHierarchyDtl deleted successfully!.");
    }
}