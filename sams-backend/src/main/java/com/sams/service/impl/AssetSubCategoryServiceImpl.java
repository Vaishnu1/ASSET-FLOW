package com.sams.service.impl;

import com.sams.dto.AssetSubCategoryDTO;
import com.sams.entity.AssetSubCategory;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetSubCategoryRepository;
import com.sams.service.AssetSubCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetSubCategoryServiceImpl implements AssetSubCategoryService {

    private final AssetSubCategoryRepository repository;

    @Override
    @Transactional
    public AssetSubCategoryDTO createAssetSubCategory(AssetSubCategoryDTO dto) {
        AssetSubCategory entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetSubCategoryDTO getAssetSubCategoryById(Long id) {
        AssetSubCategory entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetSubCategory not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetSubCategoryDTO> getAllAssetSubCategories() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetSubCategoryDTO updateAssetSubCategory(Long id, AssetSubCategoryDTO dto) {
        AssetSubCategory entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetSubCategory not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        AssetSubCategory mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteAssetSubCategory(Long id) {
        AssetSubCategory entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetSubCategory not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetSubCategory mapToEntity(AssetSubCategoryDTO dto) {
        AssetSubCategory entity = new AssetSubCategory();
        entity.setSubCategoryId(dto.getSubCategoryId());
        entity.setOrgId(dto.getOrgId());
        entity.setSubCategoryName(dto.getSubCategoryName());
        entity.setCategoryId(dto.getCategoryId());
        entity.setCategoryName(dto.getCategoryName());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setOrgName(dto.getOrgName());
        entity.setExpectedLifeInYears(dto.getExpectedLifeInYears());
        entity.setMaintainanceThresholdPer(dto.getMaintainanceThresholdPer());
        entity.setDepreciationMethodId(dto.getDepreciationMethodId());
        entity.setDepreciationMethodName(dto.getDepreciationMethodName());
        entity.setRateOfDepreciation(dto.getRateOfDepreciation());
        entity.setScrapValuePer(dto.getScrapValuePer());
        entity.setAssetSubCategoryCode(dto.getAssetSubCategoryCode());
        return entity;
    }

    private AssetSubCategoryDTO mapToDTO(AssetSubCategory entity) {
        AssetSubCategoryDTO dto = new AssetSubCategoryDTO();
        dto.setId(entity.getId());
        dto.setSubCategoryId(entity.getSubCategoryId());
        dto.setOrgId(entity.getOrgId());
        dto.setSubCategoryName(entity.getSubCategoryName());
        dto.setCategoryId(entity.getCategoryId());
        dto.setCategoryName(entity.getCategoryName());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setOrgName(entity.getOrgName());
        dto.setExpectedLifeInYears(entity.getExpectedLifeInYears());
        dto.setMaintainanceThresholdPer(entity.getMaintainanceThresholdPer());
        dto.setDepreciationMethodId(entity.getDepreciationMethodId());
        dto.setDepreciationMethodName(entity.getDepreciationMethodName());
        dto.setRateOfDepreciation(entity.getRateOfDepreciation());
        dto.setScrapValuePer(entity.getScrapValuePer());
        dto.setAssetSubCategoryCode(entity.getAssetSubCategoryCode());
        return dto;
    }
}