package com.sams.controller;

import com.sams.dto.ItemTypeDTO;
import com.sams.service.ItemTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-item-types")
@RequiredArgsConstructor
public class ItemTypeController {

    private final ItemTypeService service;

    @PostMapping
    public ResponseEntity<ItemTypeDTO> create(@RequestBody ItemTypeDTO dto) {
        return new ResponseEntity<>(service.createItemType(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemTypeDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getItemTypeById(id));
    }

    @GetMapping
    public ResponseEntity<List<ItemTypeDTO>> getAll() {
        return ResponseEntity.ok(service.getAllItemTypes());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemTypeDTO> update(@PathVariable Long id, @RequestBody ItemTypeDTO dto) {
        return ResponseEntity.ok(service.updateItemType(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteItemType(id);
        return ResponseEntity.ok("ItemType deleted successfully!.");
    }
}