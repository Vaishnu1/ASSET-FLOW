package com.sams.controller;

import com.sams.dto.GroupModuleAccessDTO;
import com.sams.service.GroupModuleAccessService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-group-module-accesses")
@RequiredArgsConstructor
public class GroupModuleAccessController {

    private final GroupModuleAccessService service;

    @PostMapping
    public ResponseEntity<GroupModuleAccessDTO> create(@RequestBody GroupModuleAccessDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GroupModuleAccessDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<GroupModuleAccessDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<GroupModuleAccessDTO> update(@PathVariable Long id, @RequestBody GroupModuleAccessDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("GroupModuleAccess deleted successfully!.");
    }
}