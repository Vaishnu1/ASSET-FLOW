package com.sams.service.impl;

import com.sams.dto.AssetCustomFieldsValueDTO;
import com.sams.entity.AssetCustomFieldsValue;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetCustomFieldsValueRepository;
import com.sams.service.AssetCustomFieldsValueService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetCustomFieldsValueServiceImpl implements AssetCustomFieldsValueService {

    private final AssetCustomFieldsValueRepository repository;

    @Override
    @Transactional
    public AssetCustomFieldsValueDTO create(AssetCustomFieldsValueDTO dto) {
        AssetCustomFieldsValue entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetCustomFieldsValueDTO getById(Long id) {
        AssetCustomFieldsValue entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetCustomFieldsValue not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetCustomFieldsValueDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetCustomFieldsValueDTO update(Long id, AssetCustomFieldsValueDTO dto) {
        AssetCustomFieldsValue entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetCustomFieldsValue not found with ID: " + id));
        AssetCustomFieldsValue mapped = mapToEntity(dto);
        mapped.setCustomFieldsValueId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AssetCustomFieldsValue entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetCustomFieldsValue not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetCustomFieldsValue mapToEntity(AssetCustomFieldsValueDTO dto) {
        AssetCustomFieldsValue entity = new AssetCustomFieldsValue();
        entity.setCustomFieldsValueId(dto.getCustomFieldsValueId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setCustomFieldsHdrId(dto.getCustomFieldsHdrId());
        entity.setAssetSubCategoryId(dto.getAssetSubCategoryId());
        entity.setAssetId(dto.getAssetId());
        entity.setFieldValue(dto.getFieldValue());
        entity.setTransactionId(dto.getTransactionId());
        entity.setTransactionSource(dto.getTransactionSource());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private AssetCustomFieldsValueDTO mapToDTO(AssetCustomFieldsValue entity) {
        AssetCustomFieldsValueDTO dto = new AssetCustomFieldsValueDTO();
        dto.setCustomFieldsValueId(entity.getCustomFieldsValueId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setCustomFieldsHdrId(entity.getCustomFieldsHdrId());
        dto.setAssetSubCategoryId(entity.getAssetSubCategoryId());
        dto.setAssetId(entity.getAssetId());
        dto.setFieldValue(entity.getFieldValue());
        dto.setTransactionId(entity.getTransactionId());
        dto.setTransactionSource(entity.getTransactionSource());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}