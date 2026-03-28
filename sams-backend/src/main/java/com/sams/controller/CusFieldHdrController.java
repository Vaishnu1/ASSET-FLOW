package com.sams.controller;

import com.sams.dto.CusFieldHdrDTO;
import com.sams.service.CusFieldHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-cus-field-hdrs")
@RequiredArgsConstructor
public class CusFieldHdrController {

    private final CusFieldHdrService service;

    @PostMapping
    public ResponseEntity<CusFieldHdrDTO> create(@RequestBody CusFieldHdrDTO dto) {
        return new ResponseEntity<>(service.createCusFieldHdr(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CusFieldHdrDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getCusFieldHdrById(id));
    }

    @GetMapping
    public ResponseEntity<List<CusFieldHdrDTO>> getAll() {
        return ResponseEntity.ok(service.getAllCusFieldHdrs());
    }

    @PutMapping("/{id}")
    public ResponseEntity<CusFieldHdrDTO> update(@PathVariable Long id, @RequestBody CusFieldHdrDTO dto) {
        return ResponseEntity.ok(service.updateCusFieldHdr(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteCusFieldHdr(id);
        return ResponseEntity.ok("CusFieldHdr deleted successfully!.");
    }
}