package com.sams.service.impl;

import com.sams.dto.InventoryAuditDTO;
import com.sams.entity.InventoryAudit;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.InventoryAuditRepository;
import com.sams.service.InventoryAuditService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InventoryAuditServiceImpl implements InventoryAuditService {

    private final InventoryAuditRepository repository;

    @Override
    @Transactional
    public InventoryAuditDTO create(InventoryAuditDTO dto) {
        InventoryAudit entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public InventoryAuditDTO getById(Long id) {
        InventoryAudit entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("InventoryAudit not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<InventoryAuditDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public InventoryAuditDTO update(Long id, InventoryAuditDTO dto) {
        InventoryAudit entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("InventoryAudit not found with ID: " + id));
        InventoryAudit mapped = mapToEntity(dto);
        mapped.setInventoryAuditId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        InventoryAudit entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("InventoryAudit not found with ID: " + id));
        repository.delete(entity);
    }

    private InventoryAudit mapToEntity(InventoryAuditDTO dto) {
        InventoryAudit entity = new InventoryAudit();
        entity.setInventoryAuditId(dto.getInventoryAuditId());
        entity.setInventoryAuditNo(dto.getInventoryAuditNo());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setInventoryId(dto.getInventoryId());
        entity.setStoreId(dto.getStoreId());
        entity.setStoreName(dto.getStoreName());
        entity.setItemId(dto.getItemId());
        entity.setItemName(dto.getItemName());
        entity.setUnitPrice(dto.getUnitPrice());
        entity.setOldStkInHand(dto.getOldStkInHand());
        entity.setNewStkInHand(dto.getNewStkInHand());
        entity.setTransactionId(dto.getTransactionId());
        entity.setTransactionSrc(dto.getTransactionSrc());
        entity.setTransactionDt(dto.getTransactionDt());
        entity.setTransactionNo(dto.getTransactionNo());
        entity.setRemarks(dto.getRemarks());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        return entity;
    }

    private InventoryAuditDTO mapToDTO(InventoryAudit entity) {
        InventoryAuditDTO dto = new InventoryAuditDTO();
        dto.setInventoryAuditId(entity.getInventoryAuditId());
        dto.setInventoryAuditNo(entity.getInventoryAuditNo());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setInventoryId(entity.getInventoryId());
        dto.setStoreId(entity.getStoreId());
        dto.setStoreName(entity.getStoreName());
        dto.setItemId(entity.getItemId());
        dto.setItemName(entity.getItemName());
        dto.setUnitPrice(entity.getUnitPrice());
        dto.setOldStkInHand(entity.getOldStkInHand());
        dto.setNewStkInHand(entity.getNewStkInHand());
        dto.setTransactionId(entity.getTransactionId());
        dto.setTransactionSrc(entity.getTransactionSrc());
        dto.setTransactionDt(entity.getTransactionDt());
        dto.setTransactionNo(entity.getTransactionNo());
        dto.setRemarks(entity.getRemarks());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        return dto;
    }
}