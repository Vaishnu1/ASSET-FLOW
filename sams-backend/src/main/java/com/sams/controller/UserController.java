package com.sams.controller;

import com.sams.dto.UserDTO;
import com.sams.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/m-users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @PostMapping
    public ResponseEntity<UserDTO> create(@RequestBody UserDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, Object> loginDto) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Login successful");
        
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("dateFormat", "dd-MM-yyyy");
        responseData.put("locationId", 1L);
        responseData.put("locationName", "Headquarters");
        responseData.put("financialStartYear", "2025");
        responseData.put("financialEndYear", "2026");
        responseData.put("locCurrCd", "USD");
        responseData.put("assetRelocationApproval", true);
        responseData.put("purchaseRequestApproval", true);
        responseData.put("orgPurchaseModuleForNH", true);
        responseData.put("tlApproved", true);
        responseData.put("rmApproved", true);
        responseData.put("sourcingApproved", true);
        responseData.put("itemApproval", true);
        responseData.put("assetGatePassApproval", true);
        responseData.put("assetPhysicalAuditApproval", true);
        responseData.put("defaultUseFulLife", 5);
        responseData.put("manufacturerApproval", true);
        responseData.put("phoneNumber", "123-456-7890");
        responseData.put("contractApproval", true);
        responseData.put("contractCancel", true);
        responseData.put("loanReturnApproval", true);
        responseData.put("locationType", "Main Office");
        responseData.put("userLocRegionName", "Global");
        responseData.put("emailValidityStatus", "Valid");
        responseData.put("loginId", loginDto != null ? loginDto.getOrDefault("userName", "admin") : "admin");
        responseData.put("token", "simulated-security-token-123");
        responseData.put("orgId", 1L);
        responseData.put("entityId", 1L);
        responseData.put("pwdChangeCount", 1);

        response.put("responseData", responseData);
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> update(@PathVariable Long id, @RequestBody UserDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("User deleted successfully!.");
    }
}