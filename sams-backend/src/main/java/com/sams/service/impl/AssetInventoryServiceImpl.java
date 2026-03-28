package com.sams.service.impl;

import com.sams.dto.AssetInventoryDTO;
import com.sams.entity.AssetInventory;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetInventoryRepository;
import com.sams.service.AssetInventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetInventoryServiceImpl implements AssetInventoryService {

    private final AssetInventoryRepository repository;

    @Override
    @Transactional
    public AssetInventoryDTO create(AssetInventoryDTO dto) {
        AssetInventory entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetInventoryDTO getById(Long id) {
        AssetInventory entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetInventory not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetInventoryDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetInventoryDTO update(Long id, AssetInventoryDTO dto) {
        AssetInventory entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetInventory not found with ID: " + id));
        AssetInventory mapped = mapToEntity(dto);
        mapped.setAssetInventoryId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AssetInventory entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetInventory not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetInventory mapToEntity(AssetInventoryDTO dto) {
        AssetInventory entity = new AssetInventory();
        entity.setAssetInventoryId(dto.getAssetInventoryId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setAssetCategoryId(dto.getAssetCategoryId());
        entity.setAssetCategoryName(dto.getAssetCategoryName());
        entity.setAssetSubCategoryId(dto.getAssetSubCategoryId());
        entity.setAssetSubCategoryName(dto.getAssetSubCategoryName());
        entity.setTotalAssetsCount(dto.getTotalAssetsCount());
        entity.setTotalPurchaseCost(dto.getTotalPurchaseCost());
        entity.setCurrentValueCost(dto.getCurrentValueCost());
        entity.setCriticalAssetsCount(dto.getCriticalAssetsCount());
        entity.setNonCriticalAssetsCount(dto.getNonCriticalAssetsCount());
        entity.setExceedMaintThresholdLimit(dto.getExceedMaintThresholdLimit());
        entity.setAssetCategoryChart(dto.getAssetCategoryChart());
        entity.setAssetSubCategoryChart(dto.getAssetSubCategoryChart());
        entity.setAssetOwnershipChart(dto.getAssetOwnershipChart());
        entity.setAssetCurrentAgeChart(dto.getAssetCurrentAgeChart());
        entity.setAssetRemainingAgeChart(dto.getAssetRemainingAgeChart());
        entity.setAssetStatusChart(dto.getAssetStatusChart());
        entity.setAssetConditionChart(dto.getAssetConditionChart());
        entity.setLoanedOutExternalCount(dto.getLoanedOutExternalCount());
        entity.setLoanedOutInternalCount(dto.getLoanedOutInternalCount());
        return entity;
    }

    private AssetInventoryDTO mapToDTO(AssetInventory entity) {
        AssetInventoryDTO dto = new AssetInventoryDTO();
        dto.setAssetInventoryId(entity.getAssetInventoryId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setAssetCategoryId(entity.getAssetCategoryId());
        dto.setAssetCategoryName(entity.getAssetCategoryName());
        dto.setAssetSubCategoryId(entity.getAssetSubCategoryId());
        dto.setAssetSubCategoryName(entity.getAssetSubCategoryName());
        dto.setTotalAssetsCount(entity.getTotalAssetsCount());
        dto.setTotalPurchaseCost(entity.getTotalPurchaseCost());
        dto.setCurrentValueCost(entity.getCurrentValueCost());
        dto.setCriticalAssetsCount(entity.getCriticalAssetsCount());
        dto.setNonCriticalAssetsCount(entity.getNonCriticalAssetsCount());
        dto.setExceedMaintThresholdLimit(entity.getExceedMaintThresholdLimit());
        dto.setAssetCategoryChart(entity.getAssetCategoryChart());
        dto.setAssetSubCategoryChart(entity.getAssetSubCategoryChart());
        dto.setAssetOwnershipChart(entity.getAssetOwnershipChart());
        dto.setAssetCurrentAgeChart(entity.getAssetCurrentAgeChart());
        dto.setAssetRemainingAgeChart(entity.getAssetRemainingAgeChart());
        dto.setAssetStatusChart(entity.getAssetStatusChart());
        dto.setAssetConditionChart(entity.getAssetConditionChart());
        dto.setLoanedOutExternalCount(entity.getLoanedOutExternalCount());
        dto.setLoanedOutInternalCount(entity.getLoanedOutInternalCount());
        return dto;
    }
}