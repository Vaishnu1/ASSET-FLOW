package com.sams.controller;

import com.sams.dto.UserSessionInfoDTO;
import com.sams.service.UserSessionInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-user-session-infos")
@RequiredArgsConstructor
public class UserSessionInfoController {

    private final UserSessionInfoService service;

    @PostMapping
    public ResponseEntity<UserSessionInfoDTO> create(@RequestBody UserSessionInfoDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserSessionInfoDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<UserSessionInfoDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserSessionInfoDTO> update(@PathVariable Long id, @RequestBody UserSessionInfoDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("UserSessionInfo deleted successfully!.");
    }
}