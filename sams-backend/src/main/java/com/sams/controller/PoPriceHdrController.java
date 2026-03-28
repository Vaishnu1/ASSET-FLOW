package com.sams.controller;

import com.sams.dto.PoPriceHdrDTO;
import com.sams.service.PoPriceHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-po-price-hdrs")
@RequiredArgsConstructor
public class PoPriceHdrController {

    private final PoPriceHdrService service;

    @PostMapping
    public ResponseEntity<PoPriceHdrDTO> create(@RequestBody PoPriceHdrDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PoPriceHdrDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PoPriceHdrDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PoPriceHdrDTO> update(@PathVariable Long id, @RequestBody PoPriceHdrDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("PoPriceHdr deleted successfully!.");
    }
}