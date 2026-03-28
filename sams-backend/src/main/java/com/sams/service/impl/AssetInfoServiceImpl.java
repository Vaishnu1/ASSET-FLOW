package com.sams.service.impl;

import com.sams.dto.AssetInfoDTO;
import com.sams.entity.AssetInfo;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetInfoRepository;
import com.sams.service.AssetInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetInfoServiceImpl implements AssetInfoService {

    private final AssetInfoRepository repository;

    @Override
    @Transactional
    public AssetInfoDTO create(AssetInfoDTO dto) {
        AssetInfo entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetInfoDTO getById(Long id) {
        AssetInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetInfo not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetInfoDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetInfoDTO update(Long id, AssetInfoDTO dto) {
        AssetInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetInfo not found with ID: " + id));
        AssetInfo mapped = mapToEntity(dto);
        mapped.setAssetId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AssetInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetInfo not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetInfo mapToEntity(AssetInfoDTO dto) {
        AssetInfo entity = new AssetInfo();
        entity.setAssetId(dto.getAssetId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setAssetCode(dto.getAssetCode());
        entity.setEquipmentCode(dto.getEquipmentCode());
        entity.setDescription(dto.getDescription());
        entity.setSerialNo(dto.getSerialNo());
        entity.setAssetStatusId(dto.getAssetStatusId());
        entity.setModelId(dto.getModelId());
        entity.setModelName(dto.getModelName());
        entity.setAssetCategoryId(dto.getAssetCategoryId());
        entity.setAssetCategoryName(dto.getAssetCategoryName());
        entity.setAssetSubCategoryName(dto.getAssetSubCategoryName());
        entity.setAssetSubCategoryId(dto.getAssetSubCategoryId());
        entity.setAssetGroupId(dto.getAssetGroupId());
        entity.setAssetGroupName(dto.getAssetGroupName());
        entity.setAssetTypeId(dto.getAssetTypeId());
        entity.setAssetTypeName(dto.getAssetTypeName());
        entity.setAssetPriority(dto.getAssetPriority());
        entity.setAssetRiskNature(dto.getAssetRiskNature());
        entity.setFunctionalStatus(dto.getFunctionalStatus());
        entity.setMaintenanceThresholdValue(dto.getMaintenanceThresholdValue());
        entity.setExpectedLifeInYears(dto.getExpectedLifeInYears());
        entity.setDepartmentId(dto.getDepartmentId());
        entity.setDepartmentName(dto.getDepartmentName());
        entity.setSubDepartment(dto.getSubDepartment());
        entity.setSubDepartmentId(dto.getSubDepartmentId());
        entity.setOwnershipType(dto.getOwnershipType());
        entity.setBusinessPartnerId(dto.getBusinessPartnerId());
        entity.setBusinessPartnerSiteId(dto.getBusinessPartnerSiteId());
        entity.setCustomerId(dto.getCustomerId());
        entity.setCustomerSiteId(dto.getCustomerSiteId());
        entity.setPurchaseOrderNo(dto.getPurchaseOrderNo());
        entity.setPurchaseOrderDt(dto.getPurchaseOrderDt());
        entity.setLocationCurrencyCode(dto.getLocationCurrencyCode());
        entity.setPurchaseCurrencyCode(dto.getPurchaseCurrencyCode());
        entity.setOriginalPurchaseAmount(dto.getOriginalPurchaseAmount());
        entity.setExchangeRate(dto.getExchangeRate());
        entity.setLocalPurchaseAmount(dto.getLocalPurchaseAmount());
        entity.setLocalTaxRate(dto.getLocalTaxRate());
        entity.setLocalTaxAmount(dto.getLocalTaxAmount());
        entity.setTotalPurchaseAmount(dto.getTotalPurchaseAmount());
        entity.setInvoiceNo(dto.getInvoiceNo());
        entity.setInvoiceDt(dto.getInvoiceDt());
        entity.setInvoiceValue(dto.getInvoiceValue());
        entity.setInstallationType(dto.getInstallationType());
        entity.setInstallationDt(dto.getInstallationDt());
        entity.setExpectedInstallationDt(dto.getExpectedInstallationDt());
        entity.setActualInstalledDt(dto.getActualInstalledDt());
        entity.setAgeOfTheAsset(dto.getAgeOfTheAsset());
        entity.setInstalledBy(dto.getInstalledBy());
        entity.setInstallationRemarks(dto.getInstallationRemarks());
        entity.setHandoverDt(dto.getHandoverDt());
        entity.setBuildingBlock(dto.getBuildingBlock());
        entity.setBuildingFloor(dto.getBuildingFloor());
        entity.setBuildingSegment(dto.getBuildingSegment());
        entity.setBuildingRoomName(dto.getBuildingRoomName());
        entity.setDepreciationMethod(dto.getDepreciationMethod());
        entity.setBookValue(dto.getBookValue());
        entity.setNoOfYears(dto.getNoOfYears());
        entity.setScrapValue(dto.getScrapValue());
        entity.setRetiredBy(dto.getRetiredBy());
        entity.setRetiredDt(dto.getRetiredDt());
        entity.setDisposedBy(dto.getDisposedBy());
        entity.setDisposedDt(dto.getDisposedDt());
        entity.setInwardInventoryHdrId(dto.getInwardInventoryHdrId());
        entity.setInwardInventoryDtlId(dto.getInwardInventoryDtlId());
        entity.setExpectedArrivalDt(dto.getExpectedArrivalDt());
        entity.setReceivedBy(dto.getReceivedBy());
        entity.setReceivedDt(dto.getReceivedDt());
        entity.setDeliveryRemarks(dto.getDeliveryRemarks());
        entity.setInstallationWoNumber(dto.getInstallationWoNumber());
        entity.setInstallationDoneBy(dto.getInstallationDoneBy());
        entity.setInsInternalEngineerId(dto.getInsInternalEngineerId());
        entity.setInsInternalEngineerName(dto.getInsInternalEngineerName());
        entity.setInstallationProvidedBy(dto.getInstallationProvidedBy());
        entity.setInstallationProvidedById(dto.getInstallationProvidedById());
        entity.setInstallationProvidedByName(dto.getInstallationProvidedByName());
        entity.setInsExternalEngineerName(dto.getInsExternalEngineerName());
        entity.setInsExtEngineerContactNo(dto.getInsExtEngineerContactNo());
        entity.setInsExtEngineerEmailId(dto.getInsExtEngineerEmailId());
        entity.setTotalAmcCmcCostIncurred(dto.getTotalAmcCmcCostIncurred());
        entity.setTotalAccessoriesCost(dto.getTotalAccessoriesCost());
        entity.setTotalConsumableCost(dto.getTotalConsumableCost());
        entity.setSpareCostUsedFromStock(dto.getSpareCostUsedFromStock());
        entity.setSpareCostMiscPurchased(dto.getSpareCostMiscPurchased());
        entity.setLabourChargeCost(dto.getLabourChargeCost());
        entity.setTotalEngineerCost(dto.getTotalEngineerCost());
        entity.setUnitInGoodWorking(dto.getUnitInGoodWorking());
        entity.setUnitInPartiallyWorking(dto.getUnitInPartiallyWorking());
        entity.setHandoverCompletedStatus(dto.getHandoverCompletedStatus());
        entity.setStoreId(dto.getStoreId());
        entity.setLastUpdatedCostInfoDtlDt(dto.getLastUpdatedCostInfoDtlDt());
        entity.setAgeCriteria(dto.getAgeCriteria());
        entity.setInclusiveTax(dto.getInclusiveTax());
        entity.setVolumeLicenseQty(dto.getVolumeLicenseQty());
        entity.setUsedVolumeLicenseQty(dto.getUsedVolumeLicenseQty());
        entity.setRateOfDepreciation(dto.getRateOfDepreciation());
        entity.setStatusTypeId(dto.getStatusTypeId());
        entity.setAssetConditionId(dto.getAssetConditionId());
        entity.setProcessId(dto.getProcessId());
        entity.setProcessStatusId(dto.getProcessStatusId());
        entity.setRemarks(dto.getRemarks());
        entity.setScrapValuePercentage(dto.getScrapValuePercentage());
        entity.setTransactionSrc(dto.getTransactionSrc());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setCapexNumber(dto.getCapexNumber());
        entity.setFarNumber(dto.getFarNumber());
        entity.setPurchasedStatus(dto.getPurchasedStatus());
        entity.setServiceProviderId(dto.getServiceProviderId());
        entity.setServiceProviderSiteId(dto.getServiceProviderSiteId());
        entity.setPmMaintenanceStrategy(dto.getPmMaintenanceStrategy());
        entity.setPaMaintenanceStrategy(dto.getPaMaintenanceStrategy());
        entity.setQaMaintenanceStrategy(dto.getQaMaintenanceStrategy());
        entity.setMaintenanceStrategy(dto.getMaintenanceStrategy());
        entity.setAmcPercent(dto.getAmcPercent());
        entity.setCmcPercent(dto.getCmcPercent());
        entity.setAmcValue(dto.getAmcValue());
        entity.setCmcValue(dto.getCmcValue());
        entity.setAmcEscalationPercentage(dto.getAmcEscalationPercentage());
        entity.setCmcEscalationPercentage(dto.getCmcEscalationPercentage());
        entity.setAmcEscalationValue(dto.getAmcEscalationValue());
        entity.setCmcEscalationValue(dto.getCmcEscalationValue());
        entity.setChangeAssetCodeReqFlag(dto.getChangeAssetCodeReqFlag());
        entity.setImagePath(dto.getImagePath());
        entity.setOwnedBy(dto.getOwnedBy());
        entity.setContractId(dto.getContractId());
        entity.setIncomeTaxDepreciation(dto.getIncomeTaxDepreciation());
        entity.setPmFrequency(dto.getPmFrequency());
        entity.setPaFrequency(dto.getPaFrequency());
        entity.setQaFrequency(dto.getQaFrequency());
        entity.setPmMonth(dto.getPmMonth());
        entity.setPaMonth(dto.getPaMonth());
        entity.setQaMonth(dto.getQaMonth());
        entity.setPmDate(dto.getPmDate());
        entity.setPaDate(dto.getPaDate());
        entity.setQaDate(dto.getQaDate());
        entity.setAmFrequency(dto.getAmFrequency());
        entity.setAmMonth(dto.getAmMonth());
        entity.setAmDate(dto.getAmDate());
        entity.setLastAutoPmCreatedDate(dto.getLastAutoPmCreatedDate());
        entity.setLastAutoPaCreatedDate(dto.getLastAutoPaCreatedDate());
        entity.setLastAutoQaCreatedDate(dto.getLastAutoQaCreatedDate());
        entity.setRejectReason(dto.getRejectReason());
        entity.setMaintenanceThresholdPercentage(dto.getMaintenanceThresholdPercentage());
        entity.setWorkFlowProcessStatusId(dto.getWorkFlowProcessStatusId());
        return entity;
    }

    private AssetInfoDTO mapToDTO(AssetInfo entity) {
        AssetInfoDTO dto = new AssetInfoDTO();
        dto.setAssetId(entity.getAssetId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setAssetCode(entity.getAssetCode());
        dto.setEquipmentCode(entity.getEquipmentCode());
        dto.setDescription(entity.getDescription());
        dto.setSerialNo(entity.getSerialNo());
        dto.setAssetStatusId(entity.getAssetStatusId());
        dto.setModelId(entity.getModelId());
        dto.setModelName(entity.getModelName());
        dto.setAssetCategoryId(entity.getAssetCategoryId());
        dto.setAssetCategoryName(entity.getAssetCategoryName());
        dto.setAssetSubCategoryName(entity.getAssetSubCategoryName());
        dto.setAssetSubCategoryId(entity.getAssetSubCategoryId());
        dto.setAssetGroupId(entity.getAssetGroupId());
        dto.setAssetGroupName(entity.getAssetGroupName());
        dto.setAssetTypeId(entity.getAssetTypeId());
        dto.setAssetTypeName(entity.getAssetTypeName());
        dto.setAssetPriority(entity.getAssetPriority());
        dto.setAssetRiskNature(entity.getAssetRiskNature());
        dto.setFunctionalStatus(entity.getFunctionalStatus());
        dto.setMaintenanceThresholdValue(entity.getMaintenanceThresholdValue());
        dto.setExpectedLifeInYears(entity.getExpectedLifeInYears());
        dto.setDepartmentId(entity.getDepartmentId());
        dto.setDepartmentName(entity.getDepartmentName());
        dto.setSubDepartment(entity.getSubDepartment());
        dto.setSubDepartmentId(entity.getSubDepartmentId());
        dto.setOwnershipType(entity.getOwnershipType());
        dto.setBusinessPartnerId(entity.getBusinessPartnerId());
        dto.setBusinessPartnerSiteId(entity.getBusinessPartnerSiteId());
        dto.setCustomerId(entity.getCustomerId());
        dto.setCustomerSiteId(entity.getCustomerSiteId());
        dto.setPurchaseOrderNo(entity.getPurchaseOrderNo());
        dto.setPurchaseOrderDt(entity.getPurchaseOrderDt());
        dto.setLocationCurrencyCode(entity.getLocationCurrencyCode());
        dto.setPurchaseCurrencyCode(entity.getPurchaseCurrencyCode());
        dto.setOriginalPurchaseAmount(entity.getOriginalPurchaseAmount());
        dto.setExchangeRate(entity.getExchangeRate());
        dto.setLocalPurchaseAmount(entity.getLocalPurchaseAmount());
        dto.setLocalTaxRate(entity.getLocalTaxRate());
        dto.setLocalTaxAmount(entity.getLocalTaxAmount());
        dto.setTotalPurchaseAmount(entity.getTotalPurchaseAmount());
        dto.setInvoiceNo(entity.getInvoiceNo());
        dto.setInvoiceDt(entity.getInvoiceDt());
        dto.setInvoiceValue(entity.getInvoiceValue());
        dto.setInstallationType(entity.getInstallationType());
        dto.setInstallationDt(entity.getInstallationDt());
        dto.setExpectedInstallationDt(entity.getExpectedInstallationDt());
        dto.setActualInstalledDt(entity.getActualInstalledDt());
        dto.setAgeOfTheAsset(entity.getAgeOfTheAsset());
        dto.setInstalledBy(entity.getInstalledBy());
        dto.setInstallationRemarks(entity.getInstallationRemarks());
        dto.setHandoverDt(entity.getHandoverDt());
        dto.setBuildingBlock(entity.getBuildingBlock());
        dto.setBuildingFloor(entity.getBuildingFloor());
        dto.setBuildingSegment(entity.getBuildingSegment());
        dto.setBuildingRoomName(entity.getBuildingRoomName());
        dto.setDepreciationMethod(entity.getDepreciationMethod());
        dto.setBookValue(entity.getBookValue());
        dto.setNoOfYears(entity.getNoOfYears());
        dto.setScrapValue(entity.getScrapValue());
        dto.setRetiredBy(entity.getRetiredBy());
        dto.setRetiredDt(entity.getRetiredDt());
        dto.setDisposedBy(entity.getDisposedBy());
        dto.setDisposedDt(entity.getDisposedDt());
        dto.setInwardInventoryHdrId(entity.getInwardInventoryHdrId());
        dto.setInwardInventoryDtlId(entity.getInwardInventoryDtlId());
        dto.setExpectedArrivalDt(entity.getExpectedArrivalDt());
        dto.setReceivedBy(entity.getReceivedBy());
        dto.setReceivedDt(entity.getReceivedDt());
        dto.setDeliveryRemarks(entity.getDeliveryRemarks());
        dto.setInstallationWoNumber(entity.getInstallationWoNumber());
        dto.setInstallationDoneBy(entity.getInstallationDoneBy());
        dto.setInsInternalEngineerId(entity.getInsInternalEngineerId());
        dto.setInsInternalEngineerName(entity.getInsInternalEngineerName());
        dto.setInstallationProvidedBy(entity.getInstallationProvidedBy());
        dto.setInstallationProvidedById(entity.getInstallationProvidedById());
        dto.setInstallationProvidedByName(entity.getInstallationProvidedByName());
        dto.setInsExternalEngineerName(entity.getInsExternalEngineerName());
        dto.setInsExtEngineerContactNo(entity.getInsExtEngineerContactNo());
        dto.setInsExtEngineerEmailId(entity.getInsExtEngineerEmailId());
        dto.setTotalAmcCmcCostIncurred(entity.getTotalAmcCmcCostIncurred());
        dto.setTotalAccessoriesCost(entity.getTotalAccessoriesCost());
        dto.setTotalConsumableCost(entity.getTotalConsumableCost());
        dto.setSpareCostUsedFromStock(entity.getSpareCostUsedFromStock());
        dto.setSpareCostMiscPurchased(entity.getSpareCostMiscPurchased());
        dto.setLabourChargeCost(entity.getLabourChargeCost());
        dto.setTotalEngineerCost(entity.getTotalEngineerCost());
        dto.setUnitInGoodWorking(entity.getUnitInGoodWorking());
        dto.setUnitInPartiallyWorking(entity.getUnitInPartiallyWorking());
        dto.setHandoverCompletedStatus(entity.getHandoverCompletedStatus());
        dto.setStoreId(entity.getStoreId());
        dto.setLastUpdatedCostInfoDtlDt(entity.getLastUpdatedCostInfoDtlDt());
        dto.setAgeCriteria(entity.getAgeCriteria());
        dto.setInclusiveTax(entity.getInclusiveTax());
        dto.setVolumeLicenseQty(entity.getVolumeLicenseQty());
        dto.setUsedVolumeLicenseQty(entity.getUsedVolumeLicenseQty());
        dto.setRateOfDepreciation(entity.getRateOfDepreciation());
        dto.setStatusTypeId(entity.getStatusTypeId());
        dto.setAssetConditionId(entity.getAssetConditionId());
        dto.setProcessId(entity.getProcessId());
        dto.setProcessStatusId(entity.getProcessStatusId());
        dto.setRemarks(entity.getRemarks());
        dto.setScrapValuePercentage(entity.getScrapValuePercentage());
        dto.setTransactionSrc(entity.getTransactionSrc());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setCapexNumber(entity.getCapexNumber());
        dto.setFarNumber(entity.getFarNumber());
        dto.setPurchasedStatus(entity.getPurchasedStatus());
        dto.setServiceProviderId(entity.getServiceProviderId());
        dto.setServiceProviderSiteId(entity.getServiceProviderSiteId());
        dto.setPmMaintenanceStrategy(entity.getPmMaintenanceStrategy());
        dto.setPaMaintenanceStrategy(entity.getPaMaintenanceStrategy());
        dto.setQaMaintenanceStrategy(entity.getQaMaintenanceStrategy());
        dto.setMaintenanceStrategy(entity.getMaintenanceStrategy());
        dto.setAmcPercent(entity.getAmcPercent());
        dto.setCmcPercent(entity.getCmcPercent());
        dto.setAmcValue(entity.getAmcValue());
        dto.setCmcValue(entity.getCmcValue());
        dto.setAmcEscalationPercentage(entity.getAmcEscalationPercentage());
        dto.setCmcEscalationPercentage(entity.getCmcEscalationPercentage());
        dto.setAmcEscalationValue(entity.getAmcEscalationValue());
        dto.setCmcEscalationValue(entity.getCmcEscalationValue());
        dto.setChangeAssetCodeReqFlag(entity.getChangeAssetCodeReqFlag());
        dto.setImagePath(entity.getImagePath());
        dto.setOwnedBy(entity.getOwnedBy());
        dto.setContractId(entity.getContractId());
        dto.setIncomeTaxDepreciation(entity.getIncomeTaxDepreciation());
        dto.setPmFrequency(entity.getPmFrequency());
        dto.setPaFrequency(entity.getPaFrequency());
        dto.setQaFrequency(entity.getQaFrequency());
        dto.setPmMonth(entity.getPmMonth());
        dto.setPaMonth(entity.getPaMonth());
        dto.setQaMonth(entity.getQaMonth());
        dto.setPmDate(entity.getPmDate());
        dto.setPaDate(entity.getPaDate());
        dto.setQaDate(entity.getQaDate());
        dto.setAmFrequency(entity.getAmFrequency());
        dto.setAmMonth(entity.getAmMonth());
        dto.setAmDate(entity.getAmDate());
        dto.setLastAutoPmCreatedDate(entity.getLastAutoPmCreatedDate());
        dto.setLastAutoPaCreatedDate(entity.getLastAutoPaCreatedDate());
        dto.setLastAutoQaCreatedDate(entity.getLastAutoQaCreatedDate());
        dto.setRejectReason(entity.getRejectReason());
        dto.setMaintenanceThresholdPercentage(entity.getMaintenanceThresholdPercentage());
        dto.setWorkFlowProcessStatusId(entity.getWorkFlowProcessStatusId());
        return dto;
    }
}