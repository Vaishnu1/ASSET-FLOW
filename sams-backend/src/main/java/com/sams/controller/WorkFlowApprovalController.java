package com.sams.controller;

import com.sams.dto.WorkFlowApprovalDTO;
import com.sams.service.WorkFlowApprovalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/work-flow-approvals")
@RequiredArgsConstructor
public class WorkFlowApprovalController {

    private final WorkFlowApprovalService service;

    @PostMapping
    public ResponseEntity<WorkFlowApprovalDTO> create(@RequestBody WorkFlowApprovalDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkFlowApprovalDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<WorkFlowApprovalDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkFlowApprovalDTO> update(@PathVariable Long id, @RequestBody WorkFlowApprovalDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("WorkFlowApproval deleted successfully!.");
    }
}