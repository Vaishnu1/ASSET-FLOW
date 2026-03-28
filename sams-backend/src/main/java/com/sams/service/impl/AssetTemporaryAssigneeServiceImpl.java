package com.sams.service.impl;

import com.sams.dto.AssetTemporaryAssigneeDTO;
import com.sams.entity.AssetTemporaryAssignee;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetTemporaryAssigneeRepository;
import com.sams.service.AssetTemporaryAssigneeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetTemporaryAssigneeServiceImpl implements AssetTemporaryAssigneeService {

    private final AssetTemporaryAssigneeRepository repository;

    @Override
    @Transactional
    public AssetTemporaryAssigneeDTO create(AssetTemporaryAssigneeDTO dto) {
        AssetTemporaryAssignee entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetTemporaryAssigneeDTO getById(Long id) {
        AssetTemporaryAssignee entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetTemporaryAssignee not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetTemporaryAssigneeDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetTemporaryAssigneeDTO update(Long id, AssetTemporaryAssigneeDTO dto) {
        AssetTemporaryAssignee entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetTemporaryAssignee not found with ID: " + id));
        AssetTemporaryAssignee mapped = mapToEntity(dto);
        mapped.setAssetTemporaryAssigneeId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AssetTemporaryAssignee entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetTemporaryAssignee not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetTemporaryAssignee mapToEntity(AssetTemporaryAssigneeDTO dto) {
        AssetTemporaryAssignee entity = new AssetTemporaryAssignee();
        entity.setAssetTemporaryAssigneeId(dto.getAssetTemporaryAssigneeId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setAssetId(dto.getAssetId());
        entity.setTransactionId(dto.getTransactionId());
        entity.setProcessId(dto.getProcessId());
        entity.setFromAssigneeId(dto.getFromAssigneeId());
        entity.setToAssigneeId(dto.getToAssigneeId());
        entity.setDefaultPersonIncharge(dto.getDefaultPersonIncharge());
        entity.setVlOldQty(dto.getVlOldQty());
        entity.setVlNewQty(dto.getVlNewQty());
        entity.setEndDt(dto.getEndDt());
        entity.setAssigneeTypeId(dto.getAssigneeTypeId());
        entity.setUpdateFlag(dto.getUpdateFlag());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setPrimaryTechnician(dto.getPrimaryTechnician());
        entity.setSecondaryTechnician(dto.getSecondaryTechnician());
        return entity;
    }

    private AssetTemporaryAssigneeDTO mapToDTO(AssetTemporaryAssignee entity) {
        AssetTemporaryAssigneeDTO dto = new AssetTemporaryAssigneeDTO();
        dto.setAssetTemporaryAssigneeId(entity.getAssetTemporaryAssigneeId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setAssetId(entity.getAssetId());
        dto.setTransactionId(entity.getTransactionId());
        dto.setProcessId(entity.getProcessId());
        dto.setFromAssigneeId(entity.getFromAssigneeId());
        dto.setToAssigneeId(entity.getToAssigneeId());
        dto.setDefaultPersonIncharge(entity.getDefaultPersonIncharge());
        dto.setVlOldQty(entity.getVlOldQty());
        dto.setVlNewQty(entity.getVlNewQty());
        dto.setEndDt(entity.getEndDt());
        dto.setAssigneeTypeId(entity.getAssigneeTypeId());
        dto.setUpdateFlag(entity.getUpdateFlag());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setPrimaryTechnician(entity.getPrimaryTechnician());
        dto.setSecondaryTechnician(entity.getSecondaryTechnician());
        return dto;
    }
}