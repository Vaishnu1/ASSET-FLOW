package com.sams.service.impl;

import com.sams.dto.AssetRelocationDTO;
import com.sams.entity.AssetRelocation;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetRelocationRepository;
import com.sams.service.AssetRelocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetRelocationServiceImpl implements AssetRelocationService {

    private final AssetRelocationRepository repository;

    @Override
    @Transactional
    public AssetRelocationDTO createAssetRelocation(AssetRelocationDTO dto) {
        AssetRelocation entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetRelocationDTO getAssetRelocationById(Long id) {
        AssetRelocation entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetRelocation not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetRelocationDTO> getAllAssetRelocations() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetRelocationDTO updateAssetRelocation(Long id, AssetRelocationDTO dto) {
        AssetRelocation entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetRelocation not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        AssetRelocation mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteAssetRelocation(Long id) {
        AssetRelocation entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetRelocation not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetRelocation mapToEntity(AssetRelocationDTO dto) {
        AssetRelocation entity = new AssetRelocation();
        entity.setAssetRelocateId(dto.getAssetRelocateId());
        entity.setRelocateBatchNo(dto.getRelocateBatchNo());
        entity.setSourceLocId(dto.getSourceLocId());
        entity.setSourceLocName(dto.getSourceLocName());
        entity.setSourceDepId(dto.getSourceDepId());
        entity.setSourceDepName(dto.getSourceDepName());
        entity.setSourceSubDepId(dto.getSourceSubDepId());
        entity.setSourceSubDepName(dto.getSourceSubDepName());
        entity.setRelocateLocId(dto.getRelocateLocId());
        entity.setRelocateLocName(dto.getRelocateLocName());
        entity.setRelocateDepId(dto.getRelocateDepId());
        entity.setRelocateDepName(dto.getRelocateDepName());
        entity.setRelocateSubDepId(dto.getRelocateSubDepId());
        entity.setRelocateSubDepName(dto.getRelocateSubDepName());
        entity.setRequestedBy(dto.getRequestedBy());
        entity.setRequestedDt(dto.getRequestedDt());
        entity.setRequestedDtDisp(dto.getRequestedDtDisp());
        entity.setRemarks(dto.getRemarks());
        entity.setApprovedDt(dto.getApprovedDt());
        entity.setApprovedDtDisp(dto.getApprovedDtDisp());
        entity.setApprovedBy(dto.getApprovedBy());
        entity.setRelocateStatus(dto.getRelocateStatus());
        entity.setAssetCode(dto.getAssetCode());
        entity.setAssetHdrId(dto.getAssetHdrId());
        entity.setRelocateAssetCode(dto.getRelocateAssetCode());
        entity.setVolumeLicensePresent(dto.getVolumeLicensePresent());
        entity.setPreviousStatusId(dto.getPreviousStatusId());
        entity.setRelocateStatusName(dto.getRelocateStatusName());
        entity.setPrimaryEnggName(dto.getPrimaryEnggName());
        entity.setPrimaryEnggNameId(dto.getPrimaryEnggNameId());
        entity.setSecondaryEnggName(dto.getSecondaryEnggName());
        entity.setSecondaryEnggNameId(dto.getSecondaryEnggNameId());
        return entity;
    }

    private AssetRelocationDTO mapToDTO(AssetRelocation entity) {
        AssetRelocationDTO dto = new AssetRelocationDTO();
        dto.setId(entity.getId());
        dto.setAssetRelocateId(entity.getAssetRelocateId());
        dto.setRelocateBatchNo(entity.getRelocateBatchNo());
        dto.setSourceLocId(entity.getSourceLocId());
        dto.setSourceLocName(entity.getSourceLocName());
        dto.setSourceDepId(entity.getSourceDepId());
        dto.setSourceDepName(entity.getSourceDepName());
        dto.setSourceSubDepId(entity.getSourceSubDepId());
        dto.setSourceSubDepName(entity.getSourceSubDepName());
        dto.setRelocateLocId(entity.getRelocateLocId());
        dto.setRelocateLocName(entity.getRelocateLocName());
        dto.setRelocateDepId(entity.getRelocateDepId());
        dto.setRelocateDepName(entity.getRelocateDepName());
        dto.setRelocateSubDepId(entity.getRelocateSubDepId());
        dto.setRelocateSubDepName(entity.getRelocateSubDepName());
        dto.setRequestedBy(entity.getRequestedBy());
        dto.setRequestedDt(entity.getRequestedDt());
        dto.setRequestedDtDisp(entity.getRequestedDtDisp());
        dto.setRemarks(entity.getRemarks());
        dto.setApprovedDt(entity.getApprovedDt());
        dto.setApprovedDtDisp(entity.getApprovedDtDisp());
        dto.setApprovedBy(entity.getApprovedBy());
        dto.setRelocateStatus(entity.getRelocateStatus());
        dto.setAssetCode(entity.getAssetCode());
        dto.setAssetHdrId(entity.getAssetHdrId());
        dto.setRelocateAssetCode(entity.getRelocateAssetCode());
        dto.setVolumeLicensePresent(entity.getVolumeLicensePresent());
        dto.setPreviousStatusId(entity.getPreviousStatusId());
        dto.setRelocateStatusName(entity.getRelocateStatusName());
        dto.setPrimaryEnggName(entity.getPrimaryEnggName());
        dto.setPrimaryEnggNameId(entity.getPrimaryEnggNameId());
        dto.setSecondaryEnggName(entity.getSecondaryEnggName());
        dto.setSecondaryEnggNameId(entity.getSecondaryEnggNameId());
        return dto;
    }
}