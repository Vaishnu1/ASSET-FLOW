package com.sams.controller;

import com.sams.dto.ItemDTO;
import com.sams.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-items")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService service;

    @PostMapping
    public ResponseEntity<ItemDTO> create(@RequestBody ItemDTO dto) {
        return new ResponseEntity<>(service.createItem(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getItemById(id));
    }

    @GetMapping
    public ResponseEntity<List<ItemDTO>> getAll() {
        return ResponseEntity.ok(service.getAllItems());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemDTO> update(@PathVariable Long id, @RequestBody ItemDTO dto) {
        return ResponseEntity.ok(service.updateItem(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteItem(id);
        return ResponseEntity.ok("Item deleted successfully!.");
    }
}