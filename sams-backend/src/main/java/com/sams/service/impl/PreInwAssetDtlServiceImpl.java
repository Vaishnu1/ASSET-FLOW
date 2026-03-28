package com.sams.service.impl;

import com.sams.dto.PreInwAssetDtlDTO;
import com.sams.entity.PreInwAssetDtl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PreInwAssetDtlRepository;
import com.sams.service.PreInwAssetDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PreInwAssetDtlServiceImpl implements PreInwAssetDtlService {

    private final PreInwAssetDtlRepository repository;

    @Override
    @Transactional
    public PreInwAssetDtlDTO create(PreInwAssetDtlDTO dto) {
        PreInwAssetDtl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PreInwAssetDtlDTO getById(Long id) {
        PreInwAssetDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PreInwAssetDtl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PreInwAssetDtlDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PreInwAssetDtlDTO update(Long id, PreInwAssetDtlDTO dto) {
        PreInwAssetDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PreInwAssetDtl not found with ID: " + id));
        PreInwAssetDtl mapped = mapToEntity(dto);
        mapped.setInwardInventoryDtlId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PreInwAssetDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PreInwAssetDtl not found with ID: " + id));
        repository.delete(entity);
    }

    private PreInwAssetDtl mapToEntity(PreInwAssetDtlDTO dto) {
        PreInwAssetDtl entity = new PreInwAssetDtl();
        entity.setInwardInventoryDtlId(dto.getInwardInventoryDtlId());
        entity.setInwardInventoryHdrId(dto.getInwardInventoryHdrId());
        entity.setModelId(dto.getModelId());
        entity.setModelName(dto.getModelName());
        entity.setBusinessPartnerId(dto.getBusinessPartnerId());
        entity.setBusinessPartnerName(dto.getBusinessPartnerName());
        entity.setOwnershipType(dto.getOwnershipType());
        entity.setPreInwStatusId(dto.getPreInwStatusId());
        entity.setLocationCurrencyCode(dto.getLocationCurrencyCode());
        entity.setPurchaseCurrencyCode(dto.getPurchaseCurrencyCode());
        entity.setPurchaseQty(dto.getPurchaseQty());
        entity.setOriginalPurchaseAmount(dto.getOriginalPurchaseAmount());
        entity.setExchangeRate(dto.getExchangeRate());
        entity.setLocalPurchaseAmount(dto.getLocalPurchaseAmount());
        entity.setLocalTaxRate(dto.getLocalTaxRate());
        entity.setLocalTaxAmount(dto.getLocalTaxAmount());
        entity.setTotalPurchaseAmount(dto.getTotalPurchaseAmount());
        entity.setUnitPrice(dto.getUnitPrice());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setAssetCategoryId(dto.getAssetCategoryId());
        entity.setAssetSubCategoryId(dto.getAssetSubCategoryId());
        entity.setAssetTypeId(dto.getAssetTypeId());
        entity.setAssetCategoryName(dto.getAssetCategoryName());
        entity.setAssetSubCategoryName(dto.getAssetSubCategoryName());
        entity.setAssetTypeName(dto.getAssetTypeName());
        entity.setPurchaseStatus(dto.getPurchaseStatus());
        entity.setCreateContractAmcCmc(dto.getCreateContractAmcCmc());
        return entity;
    }

    private PreInwAssetDtlDTO mapToDTO(PreInwAssetDtl entity) {
        PreInwAssetDtlDTO dto = new PreInwAssetDtlDTO();
        dto.setInwardInventoryDtlId(entity.getInwardInventoryDtlId());
        dto.setInwardInventoryHdrId(entity.getInwardInventoryHdrId());
        dto.setModelId(entity.getModelId());
        dto.setModelName(entity.getModelName());
        dto.setBusinessPartnerId(entity.getBusinessPartnerId());
        dto.setBusinessPartnerName(entity.getBusinessPartnerName());
        dto.setOwnershipType(entity.getOwnershipType());
        dto.setPreInwStatusId(entity.getPreInwStatusId());
        dto.setLocationCurrencyCode(entity.getLocationCurrencyCode());
        dto.setPurchaseCurrencyCode(entity.getPurchaseCurrencyCode());
        dto.setPurchaseQty(entity.getPurchaseQty());
        dto.setOriginalPurchaseAmount(entity.getOriginalPurchaseAmount());
        dto.setExchangeRate(entity.getExchangeRate());
        dto.setLocalPurchaseAmount(entity.getLocalPurchaseAmount());
        dto.setLocalTaxRate(entity.getLocalTaxRate());
        dto.setLocalTaxAmount(entity.getLocalTaxAmount());
        dto.setTotalPurchaseAmount(entity.getTotalPurchaseAmount());
        dto.setUnitPrice(entity.getUnitPrice());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setAssetCategoryId(entity.getAssetCategoryId());
        dto.setAssetSubCategoryId(entity.getAssetSubCategoryId());
        dto.setAssetTypeId(entity.getAssetTypeId());
        dto.setAssetCategoryName(entity.getAssetCategoryName());
        dto.setAssetSubCategoryName(entity.getAssetSubCategoryName());
        dto.setAssetTypeName(entity.getAssetTypeName());
        dto.setPurchaseStatus(entity.getPurchaseStatus());
        dto.setCreateContractAmcCmc(entity.getCreateContractAmcCmc());
        return dto;
    }
}