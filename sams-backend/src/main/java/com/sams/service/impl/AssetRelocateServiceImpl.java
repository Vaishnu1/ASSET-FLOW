package com.sams.service.impl;

import com.sams.dto.AssetRelocateDTO;
import com.sams.entity.AssetRelocate;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetRelocateRepository;
import com.sams.service.AssetRelocateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetRelocateServiceImpl implements AssetRelocateService {

    private final AssetRelocateRepository repository;

    @Override
    @Transactional
    public AssetRelocateDTO create(AssetRelocateDTO dto) {
        AssetRelocate entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetRelocateDTO getById(Long id) {
        AssetRelocate entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetRelocate not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetRelocateDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetRelocateDTO update(Long id, AssetRelocateDTO dto) {
        AssetRelocate entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetRelocate not found with ID: " + id));
        AssetRelocate mapped = mapToEntity(dto);
        mapped.setAssetRelocateId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AssetRelocate entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetRelocate not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetRelocate mapToEntity(AssetRelocateDTO dto) {
        AssetRelocate entity = new AssetRelocate();
        entity.setAssetRelocateId(dto.getAssetRelocateId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setRelocateBatchNo(dto.getRelocateBatchNo());
        entity.setSourceLocationId(dto.getSourceLocationId());
        entity.setSourceLocationName(dto.getSourceLocationName());
        entity.setSourceDepId(dto.getSourceDepId());
        entity.setSourceDepName(dto.getSourceDepName());
        entity.setSourceSubDepId(dto.getSourceSubDepId());
        entity.setSourceSubDepName(dto.getSourceSubDepName());
        entity.setRelocateLocationId(dto.getRelocateLocationId());
        entity.setRelocateLocationName(dto.getRelocateLocationName());
        entity.setRelocateDepId(dto.getRelocateDepId());
        entity.setRelocateDepName(dto.getRelocateDepName());
        entity.setRelocateSubDepId(dto.getRelocateSubDepId());
        entity.setRelocateSubDepName(dto.getRelocateSubDepName());
        entity.setRequestedBy(dto.getRequestedBy());
        entity.setRequestedDt(dto.getRequestedDt());
        entity.setRelocateStatus(dto.getRelocateStatus());
        entity.setAssetCode(dto.getAssetCode());
        entity.setRelocateAssetCode(dto.getRelocateAssetCode());
        entity.setApprovedBy(dto.getApprovedBy());
        entity.setApprovedDt(dto.getApprovedDt());
        entity.setRemarks(dto.getRemarks());
        entity.setAssetId(dto.getAssetId());
        entity.setRaiseWo(dto.getRaiseWo());
        entity.setPreviousAssetStatusId(dto.getPreviousAssetStatusId());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setPrimaryEnggId(dto.getPrimaryEnggId());
        entity.setPrimaryEnggName(dto.getPrimaryEnggName());
        entity.setSecondaryEnggId(dto.getSecondaryEnggId());
        entity.setSecondaryEnggName(dto.getSecondaryEnggName());
        return entity;
    }

    private AssetRelocateDTO mapToDTO(AssetRelocate entity) {
        AssetRelocateDTO dto = new AssetRelocateDTO();
        dto.setAssetRelocateId(entity.getAssetRelocateId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setRelocateBatchNo(entity.getRelocateBatchNo());
        dto.setSourceLocationId(entity.getSourceLocationId());
        dto.setSourceLocationName(entity.getSourceLocationName());
        dto.setSourceDepId(entity.getSourceDepId());
        dto.setSourceDepName(entity.getSourceDepName());
        dto.setSourceSubDepId(entity.getSourceSubDepId());
        dto.setSourceSubDepName(entity.getSourceSubDepName());
        dto.setRelocateLocationId(entity.getRelocateLocationId());
        dto.setRelocateLocationName(entity.getRelocateLocationName());
        dto.setRelocateDepId(entity.getRelocateDepId());
        dto.setRelocateDepName(entity.getRelocateDepName());
        dto.setRelocateSubDepId(entity.getRelocateSubDepId());
        dto.setRelocateSubDepName(entity.getRelocateSubDepName());
        dto.setRequestedBy(entity.getRequestedBy());
        dto.setRequestedDt(entity.getRequestedDt());
        dto.setRelocateStatus(entity.getRelocateStatus());
        dto.setAssetCode(entity.getAssetCode());
        dto.setRelocateAssetCode(entity.getRelocateAssetCode());
        dto.setApprovedBy(entity.getApprovedBy());
        dto.setApprovedDt(entity.getApprovedDt());
        dto.setRemarks(entity.getRemarks());
        dto.setAssetId(entity.getAssetId());
        dto.setRaiseWo(entity.getRaiseWo());
        dto.setPreviousAssetStatusId(entity.getPreviousAssetStatusId());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setPrimaryEnggId(entity.getPrimaryEnggId());
        dto.setPrimaryEnggName(entity.getPrimaryEnggName());
        dto.setSecondaryEnggId(entity.getSecondaryEnggId());
        dto.setSecondaryEnggName(entity.getSecondaryEnggName());
        return dto;
    }
}