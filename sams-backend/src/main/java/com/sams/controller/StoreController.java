package com.sams.controller;

import com.sams.dto.StoreDTO;
import com.sams.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-stores")
@RequiredArgsConstructor
public class StoreController {

    private final StoreService service;

    @PostMapping
    public ResponseEntity<StoreDTO> create(@RequestBody StoreDTO dto) {
        return new ResponseEntity<>(service.createStore(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StoreDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getStoreById(id));
    }

    @GetMapping
    public ResponseEntity<List<StoreDTO>> getAll() {
        return ResponseEntity.ok(service.getAllStores());
    }

    @PutMapping("/{id}")
    public ResponseEntity<StoreDTO> update(@PathVariable Long id, @RequestBody StoreDTO dto) {
        return ResponseEntity.ok(service.updateStore(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteStore(id);
        return ResponseEntity.ok("Store deleted successfully!.");
    }
}