package com.sams.controller;

import com.sams.dto.ModelOtherInfoDTO;
import com.sams.service.ModelOtherInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/model-other-infos")
@RequiredArgsConstructor
public class ModelOtherInfoController {

    private final ModelOtherInfoService service;

    @PostMapping
    public ResponseEntity<ModelOtherInfoDTO> create(@RequestBody ModelOtherInfoDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ModelOtherInfoDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ModelOtherInfoDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ModelOtherInfoDTO> update(@PathVariable Long id, @RequestBody ModelOtherInfoDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("ModelOtherInfo deleted successfully!.");
    }
}