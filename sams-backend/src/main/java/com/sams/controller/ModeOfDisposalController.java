package com.sams.controller;

import com.sams.dto.ModeOfDisposalDTO;
import com.sams.service.ModeOfDisposalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/mode-of-disposals")
@RequiredArgsConstructor
public class ModeOfDisposalController {

    private final ModeOfDisposalService service;

    @PostMapping
    public ResponseEntity<ModeOfDisposalDTO> create(@RequestBody ModeOfDisposalDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ModeOfDisposalDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ModeOfDisposalDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ModeOfDisposalDTO> update(@PathVariable Long id, @RequestBody ModeOfDisposalDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("ModeOfDisposal deleted successfully!.");
    }
}