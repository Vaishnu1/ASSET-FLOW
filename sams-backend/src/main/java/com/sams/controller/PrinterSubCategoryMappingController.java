package com.sams.controller;

import com.sams.dto.PrinterSubCategoryMappingDTO;
import com.sams.service.PrinterSubCategoryMappingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-printer-sub-category-mappings")
@RequiredArgsConstructor
public class PrinterSubCategoryMappingController {

    private final PrinterSubCategoryMappingService service;

    @PostMapping
    public ResponseEntity<PrinterSubCategoryMappingDTO> create(@RequestBody PrinterSubCategoryMappingDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PrinterSubCategoryMappingDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PrinterSubCategoryMappingDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PrinterSubCategoryMappingDTO> update(@PathVariable Long id, @RequestBody PrinterSubCategoryMappingDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("PrinterSubCategoryMapping deleted successfully!.");
    }
}