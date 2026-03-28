package com.sams.controller;

import com.sams.dto.UserCatDeptMappingDTO;
import com.sams.service.UserCatDeptMappingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-user-cat-dept-mappings")
@RequiredArgsConstructor
public class UserCatDeptMappingController {

    private final UserCatDeptMappingService service;

    @PostMapping
    public ResponseEntity<UserCatDeptMappingDTO> create(@RequestBody UserCatDeptMappingDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserCatDeptMappingDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<UserCatDeptMappingDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserCatDeptMappingDTO> update(@PathVariable Long id, @RequestBody UserCatDeptMappingDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("UserCatDeptMapping deleted successfully!.");
    }
}