package com.sams.service.impl;

import com.sams.dto.AssetRetirementDTO;
import com.sams.entity.AssetRetirement;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetRetirementRepository;
import com.sams.service.AssetRetirementService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetRetirementServiceImpl implements AssetRetirementService {

    private final AssetRetirementRepository repository;

    @Override
    @Transactional
    public AssetRetirementDTO create(AssetRetirementDTO dto) {
        AssetRetirement entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetRetirementDTO getById(Long id) {
        AssetRetirement entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetRetirement not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetRetirementDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetRetirementDTO update(Long id, AssetRetirementDTO dto) {
        AssetRetirement entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetRetirement not found with ID: " + id));
        AssetRetirement mapped = mapToEntity(dto);
        mapped.setAssetRetireId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AssetRetirement entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetRetirement not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetRetirement mapToEntity(AssetRetirementDTO dto) {
        AssetRetirement entity = new AssetRetirement();
        entity.setAssetRetireId(dto.getAssetRetireId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setAssetId(dto.getAssetId());
        entity.setAssetCode(dto.getAssetCode());
        entity.setAssetCategoryName(dto.getAssetCategoryName());
        entity.setAssetSubCategoryName(dto.getAssetSubCategoryName());
        entity.setAssetConditionId(dto.getAssetConditionId());
        entity.setAssetRetirementStatusId(dto.getAssetRetirementStatusId());
        entity.setRetirementNo(dto.getRetirementNo());
        entity.setRetirementDt(dto.getRetirementDt());
        entity.setRetirementStatus(dto.getRetirementStatus());
        entity.setRequestedBy(dto.getRequestedBy());
        entity.setRequestReason(dto.getRequestReason());
        entity.setRetirementRemarks(dto.getRetirementRemarks());
        entity.setSalvageable(dto.getSalvageable());
        entity.setBuyBack(dto.getBuyBack());
        entity.setBuyBackSupplierId(dto.getBuyBackSupplierId());
        entity.setBuyBackSupplierSiteId(dto.getBuyBackSupplierSiteId());
        entity.setRetireValueForBuyBack(dto.getRetireValueForBuyBack());
        entity.setRetireRemarkForBuyBack(dto.getRetireRemarkForBuyBack());
        entity.setDispose(dto.getDispose());
        entity.setDisposeSupplierId(dto.getDisposeSupplierId());
        entity.setDisposeValue(dto.getDisposeValue());
        entity.setDisposeRemarks(dto.getDisposeRemarks());
        entity.setDisposalDt(dto.getDisposalDt());
        entity.setIssueGatePass(dto.getIssueGatePass());
        entity.setAssetPreviousStatusId(dto.getAssetPreviousStatusId());
        entity.setRetirementStoreId(dto.getRetirementStoreId());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setRetirementModeId(dto.getRetirementModeId());
        entity.setRetirementMode(dto.getRetirementMode());
        entity.setRejectReason(dto.getRejectReason());
        entity.setRegulatoryCompliance(dto.getRegulatoryCompliance());
        return entity;
    }

    private AssetRetirementDTO mapToDTO(AssetRetirement entity) {
        AssetRetirementDTO dto = new AssetRetirementDTO();
        dto.setAssetRetireId(entity.getAssetRetireId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setAssetId(entity.getAssetId());
        dto.setAssetCode(entity.getAssetCode());
        dto.setAssetCategoryName(entity.getAssetCategoryName());
        dto.setAssetSubCategoryName(entity.getAssetSubCategoryName());
        dto.setAssetConditionId(entity.getAssetConditionId());
        dto.setAssetRetirementStatusId(entity.getAssetRetirementStatusId());
        dto.setRetirementNo(entity.getRetirementNo());
        dto.setRetirementDt(entity.getRetirementDt());
        dto.setRetirementStatus(entity.getRetirementStatus());
        dto.setRequestedBy(entity.getRequestedBy());
        dto.setRequestReason(entity.getRequestReason());
        dto.setRetirementRemarks(entity.getRetirementRemarks());
        dto.setSalvageable(entity.getSalvageable());
        dto.setBuyBack(entity.getBuyBack());
        dto.setBuyBackSupplierId(entity.getBuyBackSupplierId());
        dto.setBuyBackSupplierSiteId(entity.getBuyBackSupplierSiteId());
        dto.setRetireValueForBuyBack(entity.getRetireValueForBuyBack());
        dto.setRetireRemarkForBuyBack(entity.getRetireRemarkForBuyBack());
        dto.setDispose(entity.getDispose());
        dto.setDisposeSupplierId(entity.getDisposeSupplierId());
        dto.setDisposeValue(entity.getDisposeValue());
        dto.setDisposeRemarks(entity.getDisposeRemarks());
        dto.setDisposalDt(entity.getDisposalDt());
        dto.setIssueGatePass(entity.getIssueGatePass());
        dto.setAssetPreviousStatusId(entity.getAssetPreviousStatusId());
        dto.setRetirementStoreId(entity.getRetirementStoreId());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setRetirementModeId(entity.getRetirementModeId());
        dto.setRetirementMode(entity.getRetirementMode());
        dto.setRejectReason(entity.getRejectReason());
        dto.setRegulatoryCompliance(entity.getRegulatoryCompliance());
        return dto;
    }
}