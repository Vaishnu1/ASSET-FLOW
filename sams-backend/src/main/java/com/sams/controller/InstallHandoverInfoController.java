package com.sams.controller;

import com.sams.dto.InstallHandoverInfoDTO;
import com.sams.service.InstallHandoverInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/m-install-handover-infos")
@RequiredArgsConstructor
public class InstallHandoverInfoController {

    private final InstallHandoverInfoService service;

    @PostMapping
    public ResponseEntity<InstallHandoverInfoDTO> create(@RequestBody InstallHandoverInfoDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InstallHandoverInfoDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<InstallHandoverInfoDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<InstallHandoverInfoDTO> update(@PathVariable Long id, @RequestBody InstallHandoverInfoDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("InstallHandoverInfo deleted successfully!.");
    }
}