package com.sams.controller;

import com.sams.dto.GroupMenuDTO;
import com.sams.service.GroupMenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-group-menus")
@RequiredArgsConstructor
public class GroupMenuController {

    private final GroupMenuService service;

    @PostMapping
    public ResponseEntity<GroupMenuDTO> create(@RequestBody GroupMenuDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GroupMenuDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<GroupMenuDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<GroupMenuDTO> update(@PathVariable Long id, @RequestBody GroupMenuDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("GroupMenu deleted successfully!.");
    }
}