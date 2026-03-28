package com.sams.controller;

import com.sams.dto.ContractTcInfoDTO;
import com.sams.service.ContractTcInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/contract-tc-infos")
@RequiredArgsConstructor
public class ContractTcInfoController {

    private final ContractTcInfoService service;

    @PostMapping
    public ResponseEntity<ContractTcInfoDTO> create(@RequestBody ContractTcInfoDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContractTcInfoDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ContractTcInfoDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContractTcInfoDTO> update(@PathVariable Long id, @RequestBody ContractTcInfoDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("ContractTcInfo deleted successfully!.");
    }
}