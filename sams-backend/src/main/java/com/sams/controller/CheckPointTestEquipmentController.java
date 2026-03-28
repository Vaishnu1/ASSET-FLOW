package com.sams.controller;

import com.sams.dto.CheckPointTestEquipmentDTO;
import com.sams.service.CheckPointTestEquipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/check-point-test-equipments")
@RequiredArgsConstructor
public class CheckPointTestEquipmentController {

    private final CheckPointTestEquipmentService service;

    @PostMapping
    public ResponseEntity<CheckPointTestEquipmentDTO> create(@RequestBody CheckPointTestEquipmentDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CheckPointTestEquipmentDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<CheckPointTestEquipmentDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<CheckPointTestEquipmentDTO> update(@PathVariable Long id, @RequestBody CheckPointTestEquipmentDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("CheckPointTestEquipment deleted successfully!.");
    }
}