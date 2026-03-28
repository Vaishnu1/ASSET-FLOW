package com.sams.controller;

import com.sams.dto.AdditionalInfoDTO;
import com.sams.service.AdditionalInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-additional-infos")
@RequiredArgsConstructor
public class AdditionalInfoController {

    private final AdditionalInfoService service;

    @PostMapping
    public ResponseEntity<AdditionalInfoDTO> create(@RequestBody AdditionalInfoDTO dto) {
        return new ResponseEntity<>(service.createAdditionalInfo(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdditionalInfoDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAdditionalInfoById(id));
    }

    @GetMapping
    public ResponseEntity<List<AdditionalInfoDTO>> getAll() {
        return ResponseEntity.ok(service.getAllAdditionalInfos());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdditionalInfoDTO> update(@PathVariable Long id, @RequestBody AdditionalInfoDTO dto) {
        return ResponseEntity.ok(service.updateAdditionalInfo(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteAdditionalInfo(id);
        return ResponseEntity.ok("AdditionalInfo deleted successfully!.");
    }
}