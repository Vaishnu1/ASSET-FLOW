package com.sams.controller;

import com.sams.dto.ItemRegisterDTO;
import com.sams.service.ItemRegisterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/item-registers")
@RequiredArgsConstructor
public class ItemRegisterController {

    private final ItemRegisterService service;

    @PostMapping
    public ResponseEntity<ItemRegisterDTO> create(@RequestBody ItemRegisterDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemRegisterDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ItemRegisterDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemRegisterDTO> update(@PathVariable Long id, @RequestBody ItemRegisterDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("ItemRegister deleted successfully!.");
    }
}