package com.sams.service.impl;

import com.sams.dto.AssetCustFieldValueDTO;
import com.sams.entity.AssetCustFieldValue;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetCustFieldValueRepository;
import com.sams.service.AssetCustFieldValueService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetCustFieldValueServiceImpl implements AssetCustFieldValueService {

    private final AssetCustFieldValueRepository repository;

    @Override
    @Transactional
    public AssetCustFieldValueDTO createAssetCustFieldValue(AssetCustFieldValueDTO dto) {
        AssetCustFieldValue entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetCustFieldValueDTO getAssetCustFieldValueById(Long id) {
        AssetCustFieldValue entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetCustFieldValue not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetCustFieldValueDTO> getAllAssetCustFieldValues() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetCustFieldValueDTO updateAssetCustFieldValue(Long id, AssetCustFieldValueDTO dto) {
        AssetCustFieldValue entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetCustFieldValue not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        AssetCustFieldValue mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteAssetCustFieldValue(Long id) {
        AssetCustFieldValue entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetCustFieldValue not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetCustFieldValue mapToEntity(AssetCustFieldValueDTO dto) {
        AssetCustFieldValue entity = new AssetCustFieldValue();
        entity.setCustomFieldValId(dto.getCustomFieldValId());
        entity.setCustomHdrId(dto.getCustomHdrId());
        entity.setAssetCategoryId(dto.getAssetCategoryId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setTransactionId(dto.getTransactionId());
        entity.setTransactionSource(dto.getTransactionSource());
        entity.setValue(dto.getValue());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private AssetCustFieldValueDTO mapToDTO(AssetCustFieldValue entity) {
        AssetCustFieldValueDTO dto = new AssetCustFieldValueDTO();
        dto.setId(entity.getId());
        dto.setCustomFieldValId(entity.getCustomFieldValId());
        dto.setCustomHdrId(entity.getCustomHdrId());
        dto.setAssetCategoryId(entity.getAssetCategoryId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setTransactionId(entity.getTransactionId());
        dto.setTransactionSource(entity.getTransactionSource());
        dto.setValue(entity.getValue());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}