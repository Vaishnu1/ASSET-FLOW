package com.sams.service.impl;

import com.sams.dto.AssetAssigneeAuditDTO;
import com.sams.entity.AssetAssigneeAudit;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetAssigneeAuditRepository;
import com.sams.service.AssetAssigneeAuditService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetAssigneeAuditServiceImpl implements AssetAssigneeAuditService {

    private final AssetAssigneeAuditRepository repository;

    @Override
    @Transactional
    public AssetAssigneeAuditDTO create(AssetAssigneeAuditDTO dto) {
        AssetAssigneeAudit entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetAssigneeAuditDTO getById(Long id) {
        AssetAssigneeAudit entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetAssigneeAudit not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetAssigneeAuditDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetAssigneeAuditDTO update(Long id, AssetAssigneeAuditDTO dto) {
        AssetAssigneeAudit entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetAssigneeAudit not found with ID: " + id));
        AssetAssigneeAudit mapped = mapToEntity(dto);
        mapped.setAssetAssigneId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AssetAssigneeAudit entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetAssigneeAudit not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetAssigneeAudit mapToEntity(AssetAssigneeAuditDTO dto) {
        AssetAssigneeAudit entity = new AssetAssigneeAudit();
        entity.setAssetAssigneId(dto.getAssetAssigneId());
        entity.setMode(dto.getMode());
        entity.setAssignedToEmpId(dto.getAssignedToEmpId());
        entity.setOrgId(dto.getOrgId());
        entity.setAssetId(dto.getAssetId());
        entity.setAssigneeTypeId(dto.getAssigneeTypeId());
        entity.setStartDt(dto.getStartDt());
        entity.setEndDt(dto.getEndDt());
        entity.setDefaultPersonIncharge(dto.getDefaultPersonIncharge());
        entity.setDefaultSr(dto.getDefaultSr());
        entity.setActive(dto.getActive());
        entity.setDepartmentId(dto.getDepartmentId());
        entity.setApprovalStatus(dto.getApprovalStatus());
        entity.setCreatedById(dto.getCreatedById());
        entity.setUserId(dto.getUserId());
        entity.setRejectReason(dto.getRejectReason());
        entity.setAssignedVolumeLicenseQty(dto.getAssignedVolumeLicenseQty());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setPrimaryTechnician(dto.getPrimaryTechnician());
        entity.setSecondaryTechnician(dto.getSecondaryTechnician());
        entity.setEmployeeCode(dto.getEmployeeCode());
        entity.setPmPaTechnician(dto.getPmPaTechnician());
        entity.setQaTechnician(dto.getQaTechnician());
        entity.setAuditCreatedDt(dto.getAuditCreatedDt());
        return entity;
    }

    private AssetAssigneeAuditDTO mapToDTO(AssetAssigneeAudit entity) {
        AssetAssigneeAuditDTO dto = new AssetAssigneeAuditDTO();
        dto.setAssetAssigneId(entity.getAssetAssigneId());
        dto.setMode(entity.getMode());
        dto.setAssignedToEmpId(entity.getAssignedToEmpId());
        dto.setOrgId(entity.getOrgId());
        dto.setAssetId(entity.getAssetId());
        dto.setAssigneeTypeId(entity.getAssigneeTypeId());
        dto.setStartDt(entity.getStartDt());
        dto.setEndDt(entity.getEndDt());
        dto.setDefaultPersonIncharge(entity.getDefaultPersonIncharge());
        dto.setDefaultSr(entity.getDefaultSr());
        dto.setActive(entity.getActive());
        dto.setDepartmentId(entity.getDepartmentId());
        dto.setApprovalStatus(entity.getApprovalStatus());
        dto.setCreatedById(entity.getCreatedById());
        dto.setUserId(entity.getUserId());
        dto.setRejectReason(entity.getRejectReason());
        dto.setAssignedVolumeLicenseQty(entity.getAssignedVolumeLicenseQty());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setPrimaryTechnician(entity.getPrimaryTechnician());
        dto.setSecondaryTechnician(entity.getSecondaryTechnician());
        dto.setEmployeeCode(entity.getEmployeeCode());
        dto.setPmPaTechnician(entity.getPmPaTechnician());
        dto.setQaTechnician(entity.getQaTechnician());
        dto.setAuditCreatedDt(entity.getAuditCreatedDt());
        return dto;
    }
}