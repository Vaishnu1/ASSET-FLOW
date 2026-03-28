package com.sams.controller;

import com.sams.dto.MailNotificationDTO;
import com.sams.service.MailNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-mail-notifications")
@RequiredArgsConstructor
public class MailNotificationController {

    private final MailNotificationService service;

    @PostMapping
    public ResponseEntity<MailNotificationDTO> create(@RequestBody MailNotificationDTO dto) {
        return new ResponseEntity<>(service.createMailNotification(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MailNotificationDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getMailNotificationById(id));
    }

    @GetMapping
    public ResponseEntity<List<MailNotificationDTO>> getAll() {
        return ResponseEntity.ok(service.getAllMailNotifications());
    }

    @PutMapping("/{id}")
    public ResponseEntity<MailNotificationDTO> update(@PathVariable Long id, @RequestBody MailNotificationDTO dto) {
        return ResponseEntity.ok(service.updateMailNotification(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteMailNotification(id);
        return ResponseEntity.ok("MailNotification deleted successfully!.");
    }
}