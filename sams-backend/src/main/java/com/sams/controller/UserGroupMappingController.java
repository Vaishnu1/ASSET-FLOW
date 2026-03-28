package com.sams.controller;

import com.sams.dto.UserGroupMappingDTO;
import com.sams.service.UserGroupMappingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-user-group-mappings")
@RequiredArgsConstructor
public class UserGroupMappingController {

    private final UserGroupMappingService service;

    @PostMapping
    public ResponseEntity<UserGroupMappingDTO> create(@RequestBody UserGroupMappingDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserGroupMappingDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<UserGroupMappingDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserGroupMappingDTO> update(@PathVariable Long id, @RequestBody UserGroupMappingDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("UserGroupMapping deleted successfully!.");
    }
}