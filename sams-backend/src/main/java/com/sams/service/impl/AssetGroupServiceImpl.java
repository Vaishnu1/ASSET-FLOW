package com.sams.service.impl;

import com.sams.dto.AssetGroupDTO;
import com.sams.entity.AssetGroup;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetGroupRepository;
import com.sams.service.AssetGroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetGroupServiceImpl implements AssetGroupService {

    private final AssetGroupRepository repository;

    @Override
    @Transactional
    public AssetGroupDTO createAssetGroup(AssetGroupDTO dto) {
        AssetGroup entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetGroupDTO getAssetGroupById(Long id) {
        AssetGroup entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetGroup not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetGroupDTO> getAllAssetGroups() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetGroupDTO updateAssetGroup(Long id, AssetGroupDTO dto) {
        AssetGroup entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetGroup not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        AssetGroup mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteAssetGroup(Long id) {
        AssetGroup entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetGroup not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetGroup mapToEntity(AssetGroupDTO dto) {
        AssetGroup entity = new AssetGroup();
        entity.setAssetGroupId(dto.getAssetGroupId());
        entity.setAssetGroupName(dto.getAssetGroupName());
        entity.setAssetGroupDesc(dto.getAssetGroupDesc());
        entity.setAssetTypeId(dto.getAssetTypeId());
        entity.setAssetTypeName(dto.getAssetTypeName());
        entity.setAssetCategoryId(dto.getAssetCategoryId());
        entity.setAssetCategoryName(dto.getAssetCategoryName());
        entity.setSubCategoryId(dto.getSubCategoryId());
        entity.setSubCategoryName(dto.getSubCategoryName());
        entity.setOrgId(dto.getOrgId());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setOrgName(dto.getOrgName());
        entity.setFrequency1(dto.getFrequency1());
        entity.setFrequency2(dto.getFrequency2());
        entity.setFrequency3(dto.getFrequency3());
        entity.setMaintenanceStrategy(dto.getMaintenanceStrategy());
        entity.setCriticalNature(dto.getCriticalNature());
        entity.setEmScore(dto.getEmScore());
        entity.setChildAsset(dto.getChildAsset());
        entity.setAssetCustomFieldValue(dto.getAssetCustomFieldValue());
        entity.setAssetGroupAttribute1(dto.getAssetGroupAttribute1());
        entity.setAssetGroupAttribute2(dto.getAssetGroupAttribute2());
        entity.setAssetGroupAttribute3(dto.getAssetGroupAttribute3());
        entity.setAssetGroupAttribute4(dto.getAssetGroupAttribute4());
        entity.setAssetGroupAttribute5(dto.getAssetGroupAttribute5());
        entity.setColumnName(dto.getColumnName());
        entity.setDirection(dto.getDirection());
        entity.setSpecification(dto.getSpecification());
        entity.setDeviceCode(dto.getDeviceCode());
        entity.setDeviceConcept(dto.getDeviceConcept());
        entity.setAssetGroupCode(dto.getAssetGroupCode());
        return entity;
    }

    private AssetGroupDTO mapToDTO(AssetGroup entity) {
        AssetGroupDTO dto = new AssetGroupDTO();
        dto.setId(entity.getId());
        dto.setAssetGroupId(entity.getAssetGroupId());
        dto.setAssetGroupName(entity.getAssetGroupName());
        dto.setAssetGroupDesc(entity.getAssetGroupDesc());
        dto.setAssetTypeId(entity.getAssetTypeId());
        dto.setAssetTypeName(entity.getAssetTypeName());
        dto.setAssetCategoryId(entity.getAssetCategoryId());
        dto.setAssetCategoryName(entity.getAssetCategoryName());
        dto.setSubCategoryId(entity.getSubCategoryId());
        dto.setSubCategoryName(entity.getSubCategoryName());
        dto.setOrgId(entity.getOrgId());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setOrgName(entity.getOrgName());
        dto.setFrequency1(entity.getFrequency1());
        dto.setFrequency2(entity.getFrequency2());
        dto.setFrequency3(entity.getFrequency3());
        dto.setMaintenanceStrategy(entity.getMaintenanceStrategy());
        dto.setCriticalNature(entity.getCriticalNature());
        dto.setEmScore(entity.getEmScore());
        dto.setChildAsset(entity.getChildAsset());
        dto.setAssetCustomFieldValue(entity.getAssetCustomFieldValue());
        dto.setAssetGroupAttribute1(entity.getAssetGroupAttribute1());
        dto.setAssetGroupAttribute2(entity.getAssetGroupAttribute2());
        dto.setAssetGroupAttribute3(entity.getAssetGroupAttribute3());
        dto.setAssetGroupAttribute4(entity.getAssetGroupAttribute4());
        dto.setAssetGroupAttribute5(entity.getAssetGroupAttribute5());
        dto.setColumnName(entity.getColumnName());
        dto.setDirection(entity.getDirection());
        dto.setSpecification(entity.getSpecification());
        dto.setDeviceCode(entity.getDeviceCode());
        dto.setDeviceConcept(entity.getDeviceConcept());
        dto.setAssetGroupCode(entity.getAssetGroupCode());
        return dto;
    }
}