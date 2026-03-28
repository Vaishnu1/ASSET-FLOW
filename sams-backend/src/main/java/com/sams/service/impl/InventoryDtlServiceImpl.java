package com.sams.service.impl;

import com.sams.dto.InventoryDtlDTO;
import com.sams.entity.InventoryDtl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.InventoryDtlRepository;
import com.sams.service.InventoryDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InventoryDtlServiceImpl implements InventoryDtlService {

    private final InventoryDtlRepository repository;

    @Override
    @Transactional
    public InventoryDtlDTO create(InventoryDtlDTO dto) {
        InventoryDtl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public InventoryDtlDTO getById(Long id) {
        InventoryDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("InventoryDtl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<InventoryDtlDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public InventoryDtlDTO update(Long id, InventoryDtlDTO dto) {
        InventoryDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("InventoryDtl not found with ID: " + id));
        InventoryDtl mapped = mapToEntity(dto);
        mapped.setInvDtlId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        InventoryDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("InventoryDtl not found with ID: " + id));
        repository.delete(entity);
    }

    private InventoryDtl mapToEntity(InventoryDtlDTO dto) {
        InventoryDtl entity = new InventoryDtl();
        entity.setInvDtlId(dto.getInvDtlId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setItemId(dto.getItemId());
        entity.setItemName(dto.getItemName());
        entity.setItemDescription(dto.getItemDescription());
        entity.setManufacturerPartNo(dto.getManufacturerPartNo());
        entity.setUomCd(dto.getUomCd());
        entity.setStoreId(dto.getStoreId());
        entity.setStoreName(dto.getStoreName());
        entity.setOnHandQty(dto.getOnHandQty());
        entity.setCreateTransactionId(dto.getCreateTransactionId());
        entity.setUpdateTransactionId(dto.getUpdateTransactionId());
        entity.setBinId(dto.getBinId());
        entity.setLotNumber(dto.getLotNumber());
        entity.setProjectId(dto.getProjectId());
        entity.setOriginalReceivedDate(dto.getOriginalReceivedDate());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private InventoryDtlDTO mapToDTO(InventoryDtl entity) {
        InventoryDtlDTO dto = new InventoryDtlDTO();
        dto.setInvDtlId(entity.getInvDtlId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setItemId(entity.getItemId());
        dto.setItemName(entity.getItemName());
        dto.setItemDescription(entity.getItemDescription());
        dto.setManufacturerPartNo(entity.getManufacturerPartNo());
        dto.setUomCd(entity.getUomCd());
        dto.setStoreId(entity.getStoreId());
        dto.setStoreName(entity.getStoreName());
        dto.setOnHandQty(entity.getOnHandQty());
        dto.setCreateTransactionId(entity.getCreateTransactionId());
        dto.setUpdateTransactionId(entity.getUpdateTransactionId());
        dto.setBinId(entity.getBinId());
        dto.setLotNumber(entity.getLotNumber());
        dto.setProjectId(entity.getProjectId());
        dto.setOriginalReceivedDate(entity.getOriginalReceivedDate());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}