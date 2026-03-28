package com.sams.service.impl;

import com.sams.dto.AssetGroupDtlDTO;
import com.sams.entity.AssetGroupDtl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetGroupDtlRepository;
import com.sams.service.AssetGroupDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetGroupDtlServiceImpl implements AssetGroupDtlService {

    private final AssetGroupDtlRepository repository;

    @Override
    @Transactional
    public AssetGroupDtlDTO createAssetGroupDtl(AssetGroupDtlDTO dto) {
        AssetGroupDtl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetGroupDtlDTO getAssetGroupDtlById(Long id) {
        AssetGroupDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetGroupDtl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetGroupDtlDTO> getAllAssetGroupDtls() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetGroupDtlDTO updateAssetGroupDtl(Long id, AssetGroupDtlDTO dto) {
        AssetGroupDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetGroupDtl not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        AssetGroupDtl mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteAssetGroupDtl(Long id) {
        AssetGroupDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetGroupDtl not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetGroupDtl mapToEntity(AssetGroupDtlDTO dto) {
        AssetGroupDtl entity = new AssetGroupDtl();
        entity.setAssetGroupDtlId(dto.getAssetGroupDtlId());
        entity.setAssetGroupId(dto.getAssetGroupId());
        entity.setModelId(dto.getModelId());
        entity.setModelName(dto.getModelName());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setModelTO(dto.getModelTO());
        entity.setAssetGroupTO(dto.getAssetGroupTO());
        return entity;
    }

    private AssetGroupDtlDTO mapToDTO(AssetGroupDtl entity) {
        AssetGroupDtlDTO dto = new AssetGroupDtlDTO();
        dto.setId(entity.getId());
        dto.setAssetGroupDtlId(entity.getAssetGroupDtlId());
        dto.setAssetGroupId(entity.getAssetGroupId());
        dto.setModelId(entity.getModelId());
        dto.setModelName(entity.getModelName());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setModelTO(entity.getModelTO());
        dto.setAssetGroupTO(entity.getAssetGroupTO());
        return dto;
    }
}