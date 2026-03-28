package com.sams.controller;

import com.sams.dto.DeviceCodeDTO;
import com.sams.service.DeviceCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-device-codes")
@RequiredArgsConstructor
public class DeviceCodeController {

    private final DeviceCodeService service;

    @PostMapping
    public ResponseEntity<DeviceCodeDTO> create(@RequestBody DeviceCodeDTO dto) {
        return new ResponseEntity<>(service.createDeviceCode(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeviceCodeDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getDeviceCodeById(id));
    }

    @GetMapping
    public ResponseEntity<List<DeviceCodeDTO>> getAll() {
        return ResponseEntity.ok(service.getAllDeviceCodes());
    }

    @PutMapping("/{id}")
    public ResponseEntity<DeviceCodeDTO> update(@PathVariable Long id, @RequestBody DeviceCodeDTO dto) {
        return ResponseEntity.ok(service.updateDeviceCode(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteDeviceCode(id);
        return ResponseEntity.ok("DeviceCode deleted successfully!.");
    }
}