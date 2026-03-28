package com.sams.service.impl;

import com.sams.dto.AssetCategoryDTO;
import com.sams.entity.AssetCategory;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetCategoryRepository;
import com.sams.service.AssetCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetCategoryServiceImpl implements AssetCategoryService {

    private final AssetCategoryRepository repository;

    @Override
    @Transactional
    public AssetCategoryDTO createAssetCategory(AssetCategoryDTO dto) {
        AssetCategory entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetCategoryDTO getAssetCategoryById(Long id) {
        AssetCategory entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetCategory not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetCategoryDTO> getAllAssetCategories() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetCategoryDTO updateAssetCategory(Long id, AssetCategoryDTO dto) {
        AssetCategory entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetCategory not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        AssetCategory mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteAssetCategory(Long id) {
        AssetCategory entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetCategory not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetCategory mapToEntity(AssetCategoryDTO dto) {
        AssetCategory entity = new AssetCategory();
        entity.setAssetCategoryId(dto.getAssetCategoryId());
        entity.setOrgId(dto.getOrgId());
        entity.setAssetCategoryName(dto.getAssetCategoryName());
        entity.setBusinessType(dto.getBusinessType());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setOrgName(dto.getOrgName());
        entity.setColumnName(dto.getColumnName());
        entity.setDirection(dto.getDirection());
        entity.setMaintenanceInchargeRequired(dto.getMaintenanceInchargeRequired());
        entity.setSpecification(dto.getSpecification());
        entity.setDepreciation(dto.getDepreciation());
        entity.setModelItems(dto.getModelItems());
        entity.setDocument(dto.getDocument());
        entity.setSelfAnalysis(dto.getSelfAnalysis());
        entity.setAdditionalInfo(dto.getAdditionalInfo());
        entity.setCheckList(dto.getCheckList());
        entity.setSolutionBank(dto.getSolutionBank());
        entity.setAssetId(dto.getAssetId());
        entity.setTechnicalSpecelist(dto.getTechnicalSpecelist());
        entity.setInventoryModule(dto.getInventoryModule());
        entity.setMaintenanceSchedule(dto.getMaintenanceSchedule());
        entity.setChildModel(dto.getChildModel());
        return entity;
    }

    private AssetCategoryDTO mapToDTO(AssetCategory entity) {
        AssetCategoryDTO dto = new AssetCategoryDTO();
        dto.setId(entity.getId());
        dto.setAssetCategoryId(entity.getAssetCategoryId());
        dto.setOrgId(entity.getOrgId());
        dto.setAssetCategoryName(entity.getAssetCategoryName());
        dto.setBusinessType(entity.getBusinessType());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setOrgName(entity.getOrgName());
        dto.setColumnName(entity.getColumnName());
        dto.setDirection(entity.getDirection());
        dto.setMaintenanceInchargeRequired(entity.getMaintenanceInchargeRequired());
        dto.setSpecification(entity.getSpecification());
        dto.setDepreciation(entity.getDepreciation());
        dto.setModelItems(entity.getModelItems());
        dto.setDocument(entity.getDocument());
        dto.setSelfAnalysis(entity.getSelfAnalysis());
        dto.setAdditionalInfo(entity.getAdditionalInfo());
        dto.setCheckList(entity.getCheckList());
        dto.setSolutionBank(entity.getSolutionBank());
        dto.setAssetId(entity.getAssetId());
        dto.setTechnicalSpecelist(entity.getTechnicalSpecelist());
        dto.setInventoryModule(entity.getInventoryModule());
        dto.setMaintenanceSchedule(entity.getMaintenanceSchedule());
        dto.setChildModel(entity.getChildModel());
        return dto;
    }
}