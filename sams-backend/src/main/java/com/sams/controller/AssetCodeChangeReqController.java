package com.sams.controller;

import com.sams.dto.AssetCodeChangeReqDTO;
import com.sams.service.AssetCodeChangeReqService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/asset-code-change-reqs")
@RequiredArgsConstructor
public class AssetCodeChangeReqController {

    private final AssetCodeChangeReqService service;

    @PostMapping
    public ResponseEntity<AssetCodeChangeReqDTO> create(@RequestBody AssetCodeChangeReqDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetCodeChangeReqDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetCodeChangeReqDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetCodeChangeReqDTO> update(@PathVariable Long id, @RequestBody AssetCodeChangeReqDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("AssetCodeChangeReq deleted successfully!.");
    }
}