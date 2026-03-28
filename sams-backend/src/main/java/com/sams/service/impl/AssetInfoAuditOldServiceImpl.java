package com.sams.service.impl;

import com.sams.dto.AssetInfoAuditOldDTO;
import com.sams.entity.AssetInfoAuditOld;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetInfoAuditOldRepository;
import com.sams.service.AssetInfoAuditOldService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetInfoAuditOldServiceImpl implements AssetInfoAuditOldService {

    private final AssetInfoAuditOldRepository repository;

    @Override
    @Transactional
    public AssetInfoAuditOldDTO create(AssetInfoAuditOldDTO dto) {
        AssetInfoAuditOld entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetInfoAuditOldDTO getById(Long id) {
        AssetInfoAuditOld entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetInfoAuditOld not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetInfoAuditOldDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetInfoAuditOldDTO update(Long id, AssetInfoAuditOldDTO dto) {
        AssetInfoAuditOld entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetInfoAuditOld not found with ID: " + id));
        AssetInfoAuditOld mapped = mapToEntity(dto);
        mapped.setAssetId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AssetInfoAuditOld entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetInfoAuditOld not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetInfoAuditOld mapToEntity(AssetInfoAuditOldDTO dto) {
        AssetInfoAuditOld entity = new AssetInfoAuditOld();
        entity.setAssetId(dto.getAssetId());
        entity.setMode(dto.getMode());
        entity.setAssetCode(dto.getAssetCode());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationName(dto.getLocationName());
        entity.setLocationId(dto.getLocationId());
        entity.setModelId(dto.getModelId());
        entity.setModelName(dto.getModelName());
        entity.setAssetGroupId(dto.getAssetGroupId());
        entity.setAssetGroupName(dto.getAssetGroupName());
        entity.setAssetSubCategoryId(dto.getAssetSubCategoryId());
        entity.setAssetCategoryId(dto.getAssetCategoryId());
        entity.setAssetTypeId(dto.getAssetTypeId());
        entity.setAssetSubCategoryName(dto.getAssetSubCategoryName());
        entity.setAssetCategoryName(dto.getAssetCategoryName());
        entity.setAssetTypeName(dto.getAssetTypeName());
        entity.setDescription(dto.getDescription());
        entity.setSerialNo(dto.getSerialNo());
        entity.setAssetStatusId(dto.getAssetStatusId());
        entity.setStatusTypeId(dto.getStatusTypeId());
        entity.setAssetConditionId(dto.getAssetConditionId());
        entity.setDepartmentId(dto.getDepartmentId());
        entity.setDepartmentName(dto.getDepartmentName());
        entity.setSubDepartment(dto.getSubDepartment());
        entity.setSubDepartmentId(dto.getSubDepartmentId());
        entity.setBuildingBlock(dto.getBuildingBlock());
        entity.setBuildingFloor(dto.getBuildingFloor());
        entity.setBuildingRoomName(dto.getBuildingRoomName());
        entity.setBuildingSegment(dto.getBuildingSegment());
        entity.setOwnershipType(dto.getOwnershipType());
        entity.setFunctionalStatus(dto.getFunctionalStatus());
        entity.setBusinessPartnerId(dto.getBusinessPartnerId());
        entity.setPurchaseOrderNo(dto.getPurchaseOrderNo());
        entity.setLocationCurrencyCode(dto.getLocationCurrencyCode());
        entity.setPurchaseCurrencyCode(dto.getPurchaseCurrencyCode());
        entity.setOriginalPurchaseAmount(dto.getOriginalPurchaseAmount());
        entity.setExchangeRate(dto.getExchangeRate());
        entity.setLocalPurchaseAmount(dto.getLocalPurchaseAmount());
        entity.setLocalTaxRate(dto.getLocalTaxRate());
        entity.setLocalTaxAmount(dto.getLocalTaxAmount());
        entity.setTotalPurchaseAmount(dto.getTotalPurchaseAmount());
        entity.setInstallationDt(dto.getInstallationDt());
        entity.setDepreciationMethod(dto.getDepreciationMethod());
        entity.setBookValue(dto.getBookValue());
        entity.setNoOfYears(dto.getNoOfYears());
        entity.setScrapValue(dto.getScrapValue());
        entity.setDisposedDt(dto.getDisposedDt());
        entity.setDisposedBy(dto.getDisposedBy());
        entity.setRetiredDt(dto.getRetiredDt());
        entity.setRetiredBy(dto.getRetiredBy());
        entity.setAgeCriteria(dto.getAgeCriteria());
        entity.setAgeOfTheAsset(dto.getAgeOfTheAsset());
        entity.setTransactionSrc(dto.getTransactionSrc());
        entity.setRemarks(dto.getRemarks());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setEquipmentCode(dto.getEquipmentCode());
        entity.setMaintenanceStrategy(dto.getMaintenanceStrategy());
        entity.setPmMaintenanceStrategy(dto.getPmMaintenanceStrategy());
        entity.setPaMaintenanceStrategy(dto.getPaMaintenanceStrategy());
        entity.setQaMaintenanceStrategy(dto.getQaMaintenanceStrategy());
        entity.setPurchaseOrderDt(dto.getPurchaseOrderDt());
        entity.setBusinessPartnerSiteId(dto.getBusinessPartnerSiteId());
        return entity;
    }

    private AssetInfoAuditOldDTO mapToDTO(AssetInfoAuditOld entity) {
        AssetInfoAuditOldDTO dto = new AssetInfoAuditOldDTO();
        dto.setAssetId(entity.getAssetId());
        dto.setMode(entity.getMode());
        dto.setAssetCode(entity.getAssetCode());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationName(entity.getLocationName());
        dto.setLocationId(entity.getLocationId());
        dto.setModelId(entity.getModelId());
        dto.setModelName(entity.getModelName());
        dto.setAssetGroupId(entity.getAssetGroupId());
        dto.setAssetGroupName(entity.getAssetGroupName());
        dto.setAssetSubCategoryId(entity.getAssetSubCategoryId());
        dto.setAssetCategoryId(entity.getAssetCategoryId());
        dto.setAssetTypeId(entity.getAssetTypeId());
        dto.setAssetSubCategoryName(entity.getAssetSubCategoryName());
        dto.setAssetCategoryName(entity.getAssetCategoryName());
        dto.setAssetTypeName(entity.getAssetTypeName());
        dto.setDescription(entity.getDescription());
        dto.setSerialNo(entity.getSerialNo());
        dto.setAssetStatusId(entity.getAssetStatusId());
        dto.setStatusTypeId(entity.getStatusTypeId());
        dto.setAssetConditionId(entity.getAssetConditionId());
        dto.setDepartmentId(entity.getDepartmentId());
        dto.setDepartmentName(entity.getDepartmentName());
        dto.setSubDepartment(entity.getSubDepartment());
        dto.setSubDepartmentId(entity.getSubDepartmentId());
        dto.setBuildingBlock(entity.getBuildingBlock());
        dto.setBuildingFloor(entity.getBuildingFloor());
        dto.setBuildingRoomName(entity.getBuildingRoomName());
        dto.setBuildingSegment(entity.getBuildingSegment());
        dto.setOwnershipType(entity.getOwnershipType());
        dto.setFunctionalStatus(entity.getFunctionalStatus());
        dto.setBusinessPartnerId(entity.getBusinessPartnerId());
        dto.setPurchaseOrderNo(entity.getPurchaseOrderNo());
        dto.setLocationCurrencyCode(entity.getLocationCurrencyCode());
        dto.setPurchaseCurrencyCode(entity.getPurchaseCurrencyCode());
        dto.setOriginalPurchaseAmount(entity.getOriginalPurchaseAmount());
        dto.setExchangeRate(entity.getExchangeRate());
        dto.setLocalPurchaseAmount(entity.getLocalPurchaseAmount());
        dto.setLocalTaxRate(entity.getLocalTaxRate());
        dto.setLocalTaxAmount(entity.getLocalTaxAmount());
        dto.setTotalPurchaseAmount(entity.getTotalPurchaseAmount());
        dto.setInstallationDt(entity.getInstallationDt());
        dto.setDepreciationMethod(entity.getDepreciationMethod());
        dto.setBookValue(entity.getBookValue());
        dto.setNoOfYears(entity.getNoOfYears());
        dto.setScrapValue(entity.getScrapValue());
        dto.setDisposedDt(entity.getDisposedDt());
        dto.setDisposedBy(entity.getDisposedBy());
        dto.setRetiredDt(entity.getRetiredDt());
        dto.setRetiredBy(entity.getRetiredBy());
        dto.setAgeCriteria(entity.getAgeCriteria());
        dto.setAgeOfTheAsset(entity.getAgeOfTheAsset());
        dto.setTransactionSrc(entity.getTransactionSrc());
        dto.setRemarks(entity.getRemarks());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setEquipmentCode(entity.getEquipmentCode());
        dto.setMaintenanceStrategy(entity.getMaintenanceStrategy());
        dto.setPmMaintenanceStrategy(entity.getPmMaintenanceStrategy());
        dto.setPaMaintenanceStrategy(entity.getPaMaintenanceStrategy());
        dto.setQaMaintenanceStrategy(entity.getQaMaintenanceStrategy());
        dto.setPurchaseOrderDt(entity.getPurchaseOrderDt());
        dto.setBusinessPartnerSiteId(entity.getBusinessPartnerSiteId());
        return dto;
    }
}