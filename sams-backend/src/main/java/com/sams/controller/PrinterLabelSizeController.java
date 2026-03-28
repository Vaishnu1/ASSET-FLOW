package com.sams.controller;

import com.sams.dto.PrinterLabelSizeDTO;
import com.sams.service.PrinterLabelSizeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-printer-label-sizes")
@RequiredArgsConstructor
public class PrinterLabelSizeController {

    private final PrinterLabelSizeService service;

    @PostMapping
    public ResponseEntity<PrinterLabelSizeDTO> create(@RequestBody PrinterLabelSizeDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PrinterLabelSizeDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PrinterLabelSizeDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PrinterLabelSizeDTO> update(@PathVariable Long id, @RequestBody PrinterLabelSizeDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("PrinterLabelSize deleted successfully!.");
    }
}