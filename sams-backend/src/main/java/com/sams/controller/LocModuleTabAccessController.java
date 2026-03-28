package com.sams.controller;

import com.sams.dto.LocModuleTabAccessDTO;
import com.sams.service.LocModuleTabAccessService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-loc-module-tab-accesses")
@RequiredArgsConstructor
public class LocModuleTabAccessController {

    private final LocModuleTabAccessService service;

    @PostMapping
    public ResponseEntity<LocModuleTabAccessDTO> create(@RequestBody LocModuleTabAccessDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocModuleTabAccessDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<LocModuleTabAccessDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<LocModuleTabAccessDTO> update(@PathVariable Long id, @RequestBody LocModuleTabAccessDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("LocModuleTabAccess deleted successfully!.");
    }
}