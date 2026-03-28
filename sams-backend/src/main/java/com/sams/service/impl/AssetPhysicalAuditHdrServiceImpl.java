package com.sams.service.impl;

import com.sams.dto.AssetPhysicalAuditHdrDTO;
import com.sams.entity.AssetPhysicalAuditHdr;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetPhysicalAuditHdrRepository;
import com.sams.service.AssetPhysicalAuditHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetPhysicalAuditHdrServiceImpl implements AssetPhysicalAuditHdrService {

    private final AssetPhysicalAuditHdrRepository repository;

    @Override
    @Transactional
    public AssetPhysicalAuditHdrDTO create(AssetPhysicalAuditHdrDTO dto) {
        AssetPhysicalAuditHdr entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetPhysicalAuditHdrDTO getById(Long id) {
        AssetPhysicalAuditHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetPhysicalAuditHdr not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetPhysicalAuditHdrDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetPhysicalAuditHdrDTO update(Long id, AssetPhysicalAuditHdrDTO dto) {
        AssetPhysicalAuditHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetPhysicalAuditHdr not found with ID: " + id));
        AssetPhysicalAuditHdr mapped = mapToEntity(dto);
        mapped.setAssetPhysicalAuditHdrId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AssetPhysicalAuditHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetPhysicalAuditHdr not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetPhysicalAuditHdr mapToEntity(AssetPhysicalAuditHdrDTO dto) {
        AssetPhysicalAuditHdr entity = new AssetPhysicalAuditHdr();
        entity.setAssetPhysicalAuditHdrId(dto.getAssetPhysicalAuditHdrId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setPhysicalAuditName(dto.getPhysicalAuditName());
        entity.setPhysicalAuditDate(dto.getPhysicalAuditDate());
        entity.setAssetAuditStatusId(dto.getAssetAuditStatusId());
        entity.setActive(dto.getActive());
        entity.setApprovedBy(dto.getApprovedBy());
        entity.setApprovedDt(dto.getApprovedDt());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setAuditType(dto.getAuditType());
        return entity;
    }

    private AssetPhysicalAuditHdrDTO mapToDTO(AssetPhysicalAuditHdr entity) {
        AssetPhysicalAuditHdrDTO dto = new AssetPhysicalAuditHdrDTO();
        dto.setAssetPhysicalAuditHdrId(entity.getAssetPhysicalAuditHdrId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setPhysicalAuditName(entity.getPhysicalAuditName());
        dto.setPhysicalAuditDate(entity.getPhysicalAuditDate());
        dto.setAssetAuditStatusId(entity.getAssetAuditStatusId());
        dto.setActive(entity.getActive());
        dto.setApprovedBy(entity.getApprovedBy());
        dto.setApprovedDt(entity.getApprovedDt());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setAuditType(entity.getAuditType());
        return dto;
    }
}