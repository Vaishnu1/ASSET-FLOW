package com.sams.controller;

import com.sams.dto.WorkFlowEmailTemplateDTO;
import com.sams.service.WorkFlowEmailTemplateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/work-flow-email-templates")
@RequiredArgsConstructor
public class WorkFlowEmailTemplateController {

    private final WorkFlowEmailTemplateService service;

    @PostMapping
    public ResponseEntity<WorkFlowEmailTemplateDTO> create(@RequestBody WorkFlowEmailTemplateDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkFlowEmailTemplateDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<WorkFlowEmailTemplateDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkFlowEmailTemplateDTO> update(@PathVariable Long id, @RequestBody WorkFlowEmailTemplateDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("WorkFlowEmailTemplate deleted successfully!.");
    }
}