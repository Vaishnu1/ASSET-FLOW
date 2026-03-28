package com.sams.controller;

import com.sams.dto.PrinterModelDTO;
import com.sams.service.PrinterModelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-printer-models")
@RequiredArgsConstructor
public class PrinterModelController {

    private final PrinterModelService service;

    @PostMapping
    public ResponseEntity<PrinterModelDTO> create(@RequestBody PrinterModelDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PrinterModelDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PrinterModelDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PrinterModelDTO> update(@PathVariable Long id, @RequestBody PrinterModelDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("PrinterModel deleted successfully!.");
    }
}