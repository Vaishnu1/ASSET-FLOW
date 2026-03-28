package com.sams.controller;

import com.sams.dto.StoreLocAccessDTO;
import com.sams.service.StoreLocAccessService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-store-loc-accesses")
@RequiredArgsConstructor
public class StoreLocAccessController {

    private final StoreLocAccessService service;

    @PostMapping
    public ResponseEntity<StoreLocAccessDTO> create(@RequestBody StoreLocAccessDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StoreLocAccessDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<StoreLocAccessDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<StoreLocAccessDTO> update(@PathVariable Long id, @RequestBody StoreLocAccessDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("StoreLocAccess deleted successfully!.");
    }
}