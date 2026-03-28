package com.sams.controller;

import com.sams.dto.UserPrefernceDTO;
import com.sams.service.UserPrefernceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/user-prefernces")
@RequiredArgsConstructor
public class UserPrefernceController {

    private final UserPrefernceService service;

    @PostMapping
    public ResponseEntity<UserPrefernceDTO> create(@RequestBody UserPrefernceDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserPrefernceDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<UserPrefernceDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserPrefernceDTO> update(@PathVariable Long id, @RequestBody UserPrefernceDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("UserPrefernce deleted successfully!.");
    }
}