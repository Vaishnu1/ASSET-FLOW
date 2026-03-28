package com.sams.controller;

import com.sams.dto.ItemCategoryDTO;
import com.sams.service.ItemCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-item-categories")
@RequiredArgsConstructor
public class ItemCategoryController {

    private final ItemCategoryService service;

    @PostMapping
    public ResponseEntity<ItemCategoryDTO> create(@RequestBody ItemCategoryDTO dto) {
        return new ResponseEntity<>(service.createItemCategory(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemCategoryDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getItemCategoryById(id));
    }

    @GetMapping
    public ResponseEntity<List<ItemCategoryDTO>> getAll() {
        return ResponseEntity.ok(service.getAllItemCategories());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemCategoryDTO> update(@PathVariable Long id, @RequestBody ItemCategoryDTO dto) {
        return ResponseEntity.ok(service.updateItemCategory(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteItemCategory(id);
        return ResponseEntity.ok("ItemCategory deleted successfully!.");
    }
}