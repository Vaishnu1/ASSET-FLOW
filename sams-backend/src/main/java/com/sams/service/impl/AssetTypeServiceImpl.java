package com.sams.service.impl;

import com.sams.dto.AssetTypeDTO;
import com.sams.entity.AssetType;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetTypeRepository;
import com.sams.service.AssetTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetTypeServiceImpl implements AssetTypeService {

    private final AssetTypeRepository repository;

    @Override
    @Transactional
    public AssetTypeDTO createAssetType(AssetTypeDTO dto) {
        AssetType entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetTypeDTO getAssetTypeById(Long id) {
        AssetType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetType not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetTypeDTO> getAllAssetTypes() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetTypeDTO updateAssetType(Long id, AssetTypeDTO dto) {
        AssetType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetType not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        AssetType mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteAssetType(Long id) {
        AssetType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetType not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetType mapToEntity(AssetTypeDTO dto) {
        AssetType entity = new AssetType();
        entity.setAssetTypeId(dto.getAssetTypeId());
        entity.setAssetTypeName(dto.getAssetTypeName());
        entity.setOrgId(dto.getOrgId());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setOrgName(dto.getOrgName());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setSubCategoryName(dto.getSubCategoryName());
        entity.setSubCategoryId(dto.getSubCategoryId());
        return entity;
    }

    private AssetTypeDTO mapToDTO(AssetType entity) {
        AssetTypeDTO dto = new AssetTypeDTO();
        dto.setId(entity.getId());
        dto.setAssetTypeId(entity.getAssetTypeId());
        dto.setAssetTypeName(entity.getAssetTypeName());
        dto.setOrgId(entity.getOrgId());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setOrgName(entity.getOrgName());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setSubCategoryName(entity.getSubCategoryName());
        dto.setSubCategoryId(entity.getSubCategoryId());
        return dto;
    }
}