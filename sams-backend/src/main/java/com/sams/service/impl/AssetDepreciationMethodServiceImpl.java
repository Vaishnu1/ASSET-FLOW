package com.sams.service.impl;

import com.sams.dto.AssetDepreciationMethodDTO;
import com.sams.entity.AssetDepreciationMethod;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetDepreciationMethodRepository;
import com.sams.service.AssetDepreciationMethodService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetDepreciationMethodServiceImpl implements AssetDepreciationMethodService {

    private final AssetDepreciationMethodRepository repository;

    @Override
    @Transactional
    public AssetDepreciationMethodDTO create(AssetDepreciationMethodDTO dto) {
        AssetDepreciationMethod entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetDepreciationMethodDTO getById(Long id) {
        AssetDepreciationMethod entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetDepreciationMethod not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetDepreciationMethodDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetDepreciationMethodDTO update(Long id, AssetDepreciationMethodDTO dto) {
        AssetDepreciationMethod entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetDepreciationMethod not found with ID: " + id));
        AssetDepreciationMethod mapped = mapToEntity(dto);
        mapped.setAssetDepreciationMethodId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AssetDepreciationMethod entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetDepreciationMethod not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetDepreciationMethod mapToEntity(AssetDepreciationMethodDTO dto) {
        AssetDepreciationMethod entity = new AssetDepreciationMethod();
        entity.setAssetDepreciationMethodId(dto.getAssetDepreciationMethodId());
        entity.setOrgId(dto.getOrgId());
        entity.setAssetDepreciationMethodName(dto.getAssetDepreciationMethodName());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private AssetDepreciationMethodDTO mapToDTO(AssetDepreciationMethod entity) {
        AssetDepreciationMethodDTO dto = new AssetDepreciationMethodDTO();
        dto.setAssetDepreciationMethodId(entity.getAssetDepreciationMethodId());
        dto.setOrgId(entity.getOrgId());
        dto.setAssetDepreciationMethodName(entity.getAssetDepreciationMethodName());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}