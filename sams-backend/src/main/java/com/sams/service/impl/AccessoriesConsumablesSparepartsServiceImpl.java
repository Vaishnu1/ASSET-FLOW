package com.sams.service.impl;

import com.sams.dto.AccessoriesConsumablesSparepartsDTO;
import com.sams.entity.AccessoriesConsumablesSpareparts;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AccessoriesConsumablesSparepartsRepository;
import com.sams.service.AccessoriesConsumablesSparepartsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccessoriesConsumablesSparepartsServiceImpl implements AccessoriesConsumablesSparepartsService {

    private final AccessoriesConsumablesSparepartsRepository repository;

    @Override
    @Transactional
    public AccessoriesConsumablesSparepartsDTO create(AccessoriesConsumablesSparepartsDTO dto) {
        AccessoriesConsumablesSpareparts entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AccessoriesConsumablesSparepartsDTO getById(Long id) {
        AccessoriesConsumablesSpareparts entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AccessoriesConsumablesSpareparts not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AccessoriesConsumablesSparepartsDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AccessoriesConsumablesSparepartsDTO update(Long id, AccessoriesConsumablesSparepartsDTO dto) {
        AccessoriesConsumablesSpareparts entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AccessoriesConsumablesSpareparts not found with ID: " + id));
        AccessoriesConsumablesSpareparts mapped = mapToEntity(dto);
        mapped.setAccessoriesConsumablesSparepartsId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AccessoriesConsumablesSpareparts entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AccessoriesConsumablesSpareparts not found with ID: " + id));
        repository.delete(entity);
    }

    private AccessoriesConsumablesSpareparts mapToEntity(AccessoriesConsumablesSparepartsDTO dto) {
        AccessoriesConsumablesSpareparts entity = new AccessoriesConsumablesSpareparts();
        entity.setAccessoriesConsumablesSparepartsId(dto.getAccessoriesConsumablesSparepartsId());
        entity.setAssetHdrId(dto.getAssetHdrId());
        entity.setLocationId(dto.getLocationId());
        entity.setItemId(dto.getItemId());
        entity.setStockTransferDtlId(dto.getStockTransferDtlId());
        entity.setStockTransferHdrId(dto.getStockTransferHdrId());
        entity.setConsumedQty(dto.getConsumedQty());
        entity.setRemainingQty(dto.getRemainingQty());
        entity.setQuantity(dto.getQuantity());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private AccessoriesConsumablesSparepartsDTO mapToDTO(AccessoriesConsumablesSpareparts entity) {
        AccessoriesConsumablesSparepartsDTO dto = new AccessoriesConsumablesSparepartsDTO();
        dto.setAccessoriesConsumablesSparepartsId(entity.getAccessoriesConsumablesSparepartsId());
        dto.setAssetHdrId(entity.getAssetHdrId());
        dto.setLocationId(entity.getLocationId());
        dto.setItemId(entity.getItemId());
        dto.setStockTransferDtlId(entity.getStockTransferDtlId());
        dto.setStockTransferHdrId(entity.getStockTransferHdrId());
        dto.setConsumedQty(entity.getConsumedQty());
        dto.setRemainingQty(entity.getRemainingQty());
        dto.setQuantity(entity.getQuantity());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}