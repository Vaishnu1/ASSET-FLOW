package com.sams.controller;

import com.sams.dto.ItemLocAccessDTO;
import com.sams.service.ItemLocAccessService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-item-loc-accesses")
@RequiredArgsConstructor
public class ItemLocAccessController {

    private final ItemLocAccessService service;

    @PostMapping
    public ResponseEntity<ItemLocAccessDTO> create(@RequestBody ItemLocAccessDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemLocAccessDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ItemLocAccessDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemLocAccessDTO> update(@PathVariable Long id, @RequestBody ItemLocAccessDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("ItemLocAccess deleted successfully!.");
    }
}