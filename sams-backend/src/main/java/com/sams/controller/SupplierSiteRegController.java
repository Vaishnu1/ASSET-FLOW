package com.sams.controller;

import com.sams.dto.SupplierSiteRegDTO;
import com.sams.service.SupplierSiteRegService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-supplier-site-regs")
@RequiredArgsConstructor
public class SupplierSiteRegController {

    private final SupplierSiteRegService service;

    @PostMapping
    public ResponseEntity<SupplierSiteRegDTO> create(@RequestBody SupplierSiteRegDTO dto) {
        return new ResponseEntity<>(service.createSupplierSiteReg(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupplierSiteRegDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getSupplierSiteRegById(id));
    }

    @GetMapping
    public ResponseEntity<List<SupplierSiteRegDTO>> getAll() {
        return ResponseEntity.ok(service.getAllSupplierSiteRegs());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupplierSiteRegDTO> update(@PathVariable Long id, @RequestBody SupplierSiteRegDTO dto) {
        return ResponseEntity.ok(service.updateSupplierSiteReg(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteSupplierSiteReg(id);
        return ResponseEntity.ok("SupplierSiteReg deleted successfully!.");
    }
}