package com.sams.controller;

import com.sams.dto.AssetGroupCheckListDTO;
import com.sams.service.AssetGroupCheckListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/-asset-group-check-lists")
@RequiredArgsConstructor
public class AssetGroupCheckListController {

    private final AssetGroupCheckListService service;

    @PostMapping
    public ResponseEntity<AssetGroupCheckListDTO> create(@RequestBody AssetGroupCheckListDTO dto) {
        return new ResponseEntity<>(service.createAssetGroupCheckList(dto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetGroupCheckListDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAssetGroupCheckListById(id));
    }

    @GetMapping
    public ResponseEntity<List<AssetGroupCheckListDTO>> getAll() {
        return ResponseEntity.ok(service.getAllAssetGroupCheckLists());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetGroupCheckListDTO> update(@PathVariable Long id, @RequestBody AssetGroupCheckListDTO dto) {
        return ResponseEntity.ok(service.updateAssetGroupCheckList(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteAssetGroupCheckList(id);
        return ResponseEntity.ok("AssetGroupCheckList deleted successfully!.");
    }
}