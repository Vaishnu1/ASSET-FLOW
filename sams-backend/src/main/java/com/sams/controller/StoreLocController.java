package com.sams.controller;

import com.sams.dto.StoreLocDTO;
import com.sams.service.StoreLocService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-store-locs")
@RequiredArgsConstructor
public class StoreLocController {

    private final StoreLocService service;

    @PostMapping
    public ResponseEntity<StoreLocDTO> create(@RequestBody StoreLocDTO dto) {
        return new ResponseEntity<>(service.createStoreLoc(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StoreLocDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getStoreLocById(id));
    }

    @GetMapping
    public ResponseEntity<List<StoreLocDTO>> getAll() {
        return ResponseEntity.ok(service.getAllStoreLocs());
    }

    @PutMapping("/{id}")
    public ResponseEntity<StoreLocDTO> update(@PathVariable Long id, @RequestBody StoreLocDTO dto) {
        return ResponseEntity.ok(service.updateStoreLoc(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteStoreLoc(id);
        return ResponseEntity.ok("StoreLoc deleted successfully!.");
    }
}