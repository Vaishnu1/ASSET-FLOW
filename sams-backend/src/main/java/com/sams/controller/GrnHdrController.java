package com.sams.controller;

import com.sams.dto.GrnHdrDTO;
import com.sams.service.GrnHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/grn-hdrs")
@RequiredArgsConstructor
public class GrnHdrController {

    private final GrnHdrService service;

    @PostMapping
    public ResponseEntity<GrnHdrDTO> create(@RequestBody GrnHdrDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GrnHdrDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<GrnHdrDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<GrnHdrDTO> update(@PathVariable Long id, @RequestBody GrnHdrDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("GrnHdr deleted successfully!.");
    }
}