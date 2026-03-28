package com.sams.controller;

import com.sams.dto.ItemBranchMappingDTO;
import com.sams.service.ItemBranchMappingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-item-branch-mappings")
@RequiredArgsConstructor
public class ItemBranchMappingController {

    private final ItemBranchMappingService service;

    @PostMapping
    public ResponseEntity<ItemBranchMappingDTO> create(@RequestBody ItemBranchMappingDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemBranchMappingDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ItemBranchMappingDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemBranchMappingDTO> update(@PathVariable Long id, @RequestBody ItemBranchMappingDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("ItemBranchMapping deleted successfully!.");
    }
}