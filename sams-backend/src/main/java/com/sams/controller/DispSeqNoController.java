package com.sams.controller;

import com.sams.dto.DispSeqNoDTO;
import com.sams.service.DispSeqNoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-disp-seq-nos")
@RequiredArgsConstructor
public class DispSeqNoController {

    private final DispSeqNoService service;

    @PostMapping
    public ResponseEntity<DispSeqNoDTO> create(@RequestBody DispSeqNoDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DispSeqNoDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<DispSeqNoDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<DispSeqNoDTO> update(@PathVariable Long id, @RequestBody DispSeqNoDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("DispSeqNo deleted successfully!.");
    }
}