package com.sams.controller;

import com.sams.dto.BuildingRoomDTO;
import com.sams.service.BuildingRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-building-rooms")
@RequiredArgsConstructor
public class BuildingRoomController {

    private final BuildingRoomService service;

    @PostMapping
    public ResponseEntity<BuildingRoomDTO> create(@RequestBody BuildingRoomDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BuildingRoomDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<BuildingRoomDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BuildingRoomDTO> update(@PathVariable Long id, @RequestBody BuildingRoomDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("BuildingRoom deleted successfully!.");
    }
}