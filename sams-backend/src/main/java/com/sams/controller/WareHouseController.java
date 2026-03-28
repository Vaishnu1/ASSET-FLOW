package com.sams.controller;

import com.sams.dto.WareHouseDTO;
import com.sams.service.WareHouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-ware-houses")
@RequiredArgsConstructor
public class WareHouseController {

    private final WareHouseService service;

    @PostMapping
    public ResponseEntity<WareHouseDTO> create(@RequestBody WareHouseDTO dto) {
        return new ResponseEntity<>(service.createWareHouse(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WareHouseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getWareHouseById(id));
    }

    @GetMapping
    public ResponseEntity<List<WareHouseDTO>> getAll() {
        return ResponseEntity.ok(service.getAllWareHouses());
    }

    @PutMapping("/{id}")
    public ResponseEntity<WareHouseDTO> update(@PathVariable Long id, @RequestBody WareHouseDTO dto) {
        return ResponseEntity.ok(service.updateWareHouse(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteWareHouse(id);
        return ResponseEntity.ok("WareHouse deleted successfully!.");
    }
}