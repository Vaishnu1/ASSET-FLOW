package com.sams.controller;

import com.sams.dto.OrderReasonDTO;
import com.sams.service.OrderReasonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/order-reasons")
@RequiredArgsConstructor
public class OrderReasonController {

    private final OrderReasonService service;

    @PostMapping
    public ResponseEntity<OrderReasonDTO> create(@RequestBody OrderReasonDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderReasonDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<OrderReasonDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderReasonDTO> update(@PathVariable Long id, @RequestBody OrderReasonDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("OrderReason deleted successfully!.");
    }
}