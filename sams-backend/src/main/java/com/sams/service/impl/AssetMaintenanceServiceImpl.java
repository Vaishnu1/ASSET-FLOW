package com.sams.service.impl;

import com.sams.dto.AssetMaintenanceDTO;
import com.sams.entity.AssetMaintenance;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetMaintenanceRepository;
import com.sams.service.AssetMaintenanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetMaintenanceServiceImpl implements AssetMaintenanceService {

    private final AssetMaintenanceRepository repository;

    @Override
    @Transactional
    public AssetMaintenanceDTO create(AssetMaintenanceDTO dto) {
        AssetMaintenance entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetMaintenanceDTO getById(Long id) {
        AssetMaintenance entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetMaintenance not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetMaintenanceDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetMaintenanceDTO update(Long id, AssetMaintenanceDTO dto) {
        AssetMaintenance entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetMaintenance not found with ID: " + id));
        AssetMaintenance mapped = mapToEntity(dto);
        mapped.setAssetMaintenanceId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AssetMaintenance entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetMaintenance not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetMaintenance mapToEntity(AssetMaintenanceDTO dto) {
        AssetMaintenance entity = new AssetMaintenance();
        entity.setAssetMaintenanceId(dto.getAssetMaintenanceId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setAssetCategoryId(dto.getAssetCategoryId());
        entity.setAssetCategoryName(dto.getAssetCategoryName());
        entity.setAssetSubCategoryId(dto.getAssetSubCategoryId());
        entity.setAssetSubCategoryName(dto.getAssetSubCategoryName());
        entity.setDepartmentId(dto.getDepartmentId());
        entity.setDepartmentName(dto.getDepartmentName());
        entity.setOpenServiceRequests(dto.getOpenServiceRequests());
        entity.setOpenBmRequests(dto.getOpenBmRequests());
        entity.setOpenCriticalBmRequests(dto.getOpenCriticalBmRequests());
        entity.setMissedPmRequests(dto.getMissedPmRequests());
        entity.setMissedPaRequests(dto.getMissedPaRequests());
        entity.setTopAffectedSubcategory(dto.getTopAffectedSubcategory());
        entity.setTopAffectedBreakdownCount(dto.getTopAffectedBreakdownCount());
        entity.setSummaryMonth(dto.getSummaryMonth());
        entity.setBmAgeingJson(dto.getBmAgeingJson());
        entity.setRecurringBreakdowns(dto.getRecurringBreakdowns());
        entity.setMaintenanceCostBreakdown(dto.getMaintenanceCostBreakdown());
        entity.setExceedingSlaForBm(dto.getExceedingSlaForBm());
        entity.setMttrDistribution(dto.getMttrDistribution());
        entity.setMtbfDistribution(dto.getMtbfDistribution());
        return entity;
    }

    private AssetMaintenanceDTO mapToDTO(AssetMaintenance entity) {
        AssetMaintenanceDTO dto = new AssetMaintenanceDTO();
        dto.setAssetMaintenanceId(entity.getAssetMaintenanceId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setAssetCategoryId(entity.getAssetCategoryId());
        dto.setAssetCategoryName(entity.getAssetCategoryName());
        dto.setAssetSubCategoryId(entity.getAssetSubCategoryId());
        dto.setAssetSubCategoryName(entity.getAssetSubCategoryName());
        dto.setDepartmentId(entity.getDepartmentId());
        dto.setDepartmentName(entity.getDepartmentName());
        dto.setOpenServiceRequests(entity.getOpenServiceRequests());
        dto.setOpenBmRequests(entity.getOpenBmRequests());
        dto.setOpenCriticalBmRequests(entity.getOpenCriticalBmRequests());
        dto.setMissedPmRequests(entity.getMissedPmRequests());
        dto.setMissedPaRequests(entity.getMissedPaRequests());
        dto.setTopAffectedSubcategory(entity.getTopAffectedSubcategory());
        dto.setTopAffectedBreakdownCount(entity.getTopAffectedBreakdownCount());
        dto.setSummaryMonth(entity.getSummaryMonth());
        dto.setBmAgeingJson(entity.getBmAgeingJson());
        dto.setRecurringBreakdowns(entity.getRecurringBreakdowns());
        dto.setMaintenanceCostBreakdown(entity.getMaintenanceCostBreakdown());
        dto.setExceedingSlaForBm(entity.getExceedingSlaForBm());
        dto.setMttrDistribution(entity.getMttrDistribution());
        dto.setMtbfDistribution(entity.getMtbfDistribution());
        return dto;
    }
}