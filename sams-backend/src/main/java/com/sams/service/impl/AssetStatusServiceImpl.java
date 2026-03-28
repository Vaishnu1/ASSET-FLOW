package com.sams.service.impl;

import com.sams.dto.AssetStatusDTO;
import com.sams.entity.AssetStatus;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetStatusRepository;
import com.sams.service.AssetStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetStatusServiceImpl implements AssetStatusService {

    private final AssetStatusRepository repository;

    @Override
    @Transactional
    public AssetStatusDTO createAssetStatus(AssetStatusDTO dto) {
        AssetStatus entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetStatusDTO getAssetStatusById(Long id) {
        AssetStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetStatus not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetStatusDTO> getAllAssetStatuses() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetStatusDTO updateAssetStatus(Long id, AssetStatusDTO dto) {
        AssetStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetStatus not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        AssetStatus mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteAssetStatus(Long id) {
        AssetStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetStatus not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetStatus mapToEntity(AssetStatusDTO dto) {
        AssetStatus entity = new AssetStatus();
        entity.setAssetStatusId(dto.getAssetStatusId());
        entity.setAssetStatusName(dto.getAssetStatusName());
        entity.setOrgId(dto.getOrgId());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setOrgName(dto.getOrgName());
        return entity;
    }

    private AssetStatusDTO mapToDTO(AssetStatus entity) {
        AssetStatusDTO dto = new AssetStatusDTO();
        dto.setId(entity.getId());
        dto.setAssetStatusId(entity.getAssetStatusId());
        dto.setAssetStatusName(entity.getAssetStatusName());
        dto.setOrgId(entity.getOrgId());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setOrgName(entity.getOrgName());
        return dto;
    }
}