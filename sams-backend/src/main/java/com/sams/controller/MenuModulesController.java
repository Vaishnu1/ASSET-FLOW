package com.sams.controller;

import com.sams.dto.MenuModulesDTO;
import com.sams.service.MenuModulesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-menu-moduleses")
@RequiredArgsConstructor
public class MenuModulesController {

    private final MenuModulesService service;

    @PostMapping
    public ResponseEntity<MenuModulesDTO> create(@RequestBody MenuModulesDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MenuModulesDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<MenuModulesDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<MenuModulesDTO> update(@PathVariable Long id, @RequestBody MenuModulesDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("MenuModules deleted successfully!.");
    }
}