package com.sams.controller;

import com.sams.dto.PrinterLabelTemplateDTO;
import com.sams.service.PrinterLabelTemplateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-printer-label-templates")
@RequiredArgsConstructor
public class PrinterLabelTemplateController {

    private final PrinterLabelTemplateService service;

    @PostMapping
    public ResponseEntity<PrinterLabelTemplateDTO> create(@RequestBody PrinterLabelTemplateDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PrinterLabelTemplateDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PrinterLabelTemplateDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PrinterLabelTemplateDTO> update(@PathVariable Long id, @RequestBody PrinterLabelTemplateDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("PrinterLabelTemplate deleted successfully!.");
    }
}