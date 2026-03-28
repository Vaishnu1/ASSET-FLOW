package com.sams.controller;

import com.sams.dto.ItemApprovedSupplierDTO;
import com.sams.service.ItemApprovedSupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-item-approved-suppliers")
@RequiredArgsConstructor
public class ItemApprovedSupplierController {

    private final ItemApprovedSupplierService service;

    @PostMapping
    public ResponseEntity<ItemApprovedSupplierDTO> create(@RequestBody ItemApprovedSupplierDTO dto) {
        return new ResponseEntity<>(service.createItemApprovedSupplier(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemApprovedSupplierDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getItemApprovedSupplierById(id));
    }

    @GetMapping
    public ResponseEntity<List<ItemApprovedSupplierDTO>> getAll() {
        return ResponseEntity.ok(service.getAllItemApprovedSuppliers());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemApprovedSupplierDTO> update(@PathVariable Long id, @RequestBody ItemApprovedSupplierDTO dto) {
        return ResponseEntity.ok(service.updateItemApprovedSupplier(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteItemApprovedSupplier(id);
        return ResponseEntity.ok("ItemApprovedSupplier deleted successfully!.");
    }
}