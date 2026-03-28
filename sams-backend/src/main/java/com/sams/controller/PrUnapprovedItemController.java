package com.sams.controller;

import com.sams.dto.PrUnapprovedItemDTO;
import com.sams.service.PrUnapprovedItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/pr-unapproved-items")
@RequiredArgsConstructor
public class PrUnapprovedItemController {

    private final PrUnapprovedItemService service;

    @PostMapping
    public ResponseEntity<PrUnapprovedItemDTO> create(@RequestBody PrUnapprovedItemDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PrUnapprovedItemDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PrUnapprovedItemDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PrUnapprovedItemDTO> update(@PathVariable Long id, @RequestBody PrUnapprovedItemDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("PrUnapprovedItem deleted successfully!.");
    }
}