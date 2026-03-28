package com.sams.controller;

import com.sams.dto.WorkFlowHierarchyHdrDTO;
import com.sams.service.WorkFlowHierarchyHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/work-flow-hierarchy-hdrs")
@RequiredArgsConstructor
public class WorkFlowHierarchyHdrController {

    private final WorkFlowHierarchyHdrService service;

    @PostMapping
    public ResponseEntity<WorkFlowHierarchyHdrDTO> create(@RequestBody WorkFlowHierarchyHdrDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkFlowHierarchyHdrDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<WorkFlowHierarchyHdrDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkFlowHierarchyHdrDTO> update(@PathVariable Long id, @RequestBody WorkFlowHierarchyHdrDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("WorkFlowHierarchyHdr deleted successfully!.");
    }
}