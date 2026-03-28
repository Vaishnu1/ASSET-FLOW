package com.sams.controller;

import com.sams.dto.EmpLocDTO;
import com.sams.service.EmpLocService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-emp-locs")
@RequiredArgsConstructor
public class EmpLocController {

    private final EmpLocService service;

    @PostMapping
    public ResponseEntity<EmpLocDTO> create(@RequestBody EmpLocDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmpLocDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<EmpLocDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmpLocDTO> update(@PathVariable Long id, @RequestBody EmpLocDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("EmpLoc deleted successfully!.");
    }
}