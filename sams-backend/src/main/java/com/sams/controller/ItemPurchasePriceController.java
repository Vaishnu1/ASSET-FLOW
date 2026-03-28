package com.sams.controller;

import com.sams.dto.ItemPurchasePriceDTO;
import com.sams.service.ItemPurchasePriceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/item-purchase-prices")
@RequiredArgsConstructor
public class ItemPurchasePriceController {

    private final ItemPurchasePriceService service;

    @PostMapping
    public ResponseEntity<ItemPurchasePriceDTO> create(@RequestBody ItemPurchasePriceDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemPurchasePriceDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ItemPurchasePriceDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemPurchasePriceDTO> update(@PathVariable Long id, @RequestBody ItemPurchasePriceDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("ItemPurchasePrice deleted successfully!.");
    }
}