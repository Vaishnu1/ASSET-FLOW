package com.sams.controller;

import com.sams.dto.RequestJobInfoDTO;
import com.sams.service.RequestJobInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/request-job-infos")
@RequiredArgsConstructor
public class RequestJobInfoController {

    private final RequestJobInfoService service;

    @PostMapping
    public ResponseEntity<RequestJobInfoDTO> create(@RequestBody RequestJobInfoDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RequestJobInfoDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<RequestJobInfoDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<RequestJobInfoDTO> update(@PathVariable Long id, @RequestBody RequestJobInfoDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("RequestJobInfo deleted successfully!.");
    }
}