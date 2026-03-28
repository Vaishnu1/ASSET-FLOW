package com.sams.controller;

import com.sams.dto.PartnerRolesMapDTO;
import com.sams.service.PartnerRolesMapService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-partner-roles-maps")
@RequiredArgsConstructor
public class PartnerRolesMapController {

    private final PartnerRolesMapService service;

    @PostMapping
    public ResponseEntity<PartnerRolesMapDTO> create(@RequestBody PartnerRolesMapDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PartnerRolesMapDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PartnerRolesMapDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PartnerRolesMapDTO> update(@PathVariable Long id, @RequestBody PartnerRolesMapDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("PartnerRolesMap deleted successfully!.");
    }
}