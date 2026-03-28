package com.sams.service.impl;

import com.sams.dto.AssetAssigneeAuditOldDTO;
import com.sams.entity.AssetAssigneeAuditOld;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetAssigneeAuditOldRepository;
import com.sams.service.AssetAssigneeAuditOldService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetAssigneeAuditOldServiceImpl implements AssetAssigneeAuditOldService {

    private final AssetAssigneeAuditOldRepository repository;

    @Override
    @Transactional
    public AssetAssigneeAuditOldDTO create(AssetAssigneeAuditOldDTO dto) {
        AssetAssigneeAuditOld entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetAssigneeAuditOldDTO getById(Long id) {
        AssetAssigneeAuditOld entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetAssigneeAuditOld not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetAssigneeAuditOldDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetAssigneeAuditOldDTO update(Long id, AssetAssigneeAuditOldDTO dto) {
        AssetAssigneeAuditOld entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetAssigneeAuditOld not found with ID: " + id));
        AssetAssigneeAuditOld mapped = mapToEntity(dto);
        mapped.setAssetAssigneId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AssetAssigneeAuditOld entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetAssigneeAuditOld not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetAssigneeAuditOld mapToEntity(AssetAssigneeAuditOldDTO dto) {
        AssetAssigneeAuditOld entity = new AssetAssigneeAuditOld();
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
        entity.setAssignedToEmpName(dto.getAssignedToEmpName());
        entity.setAssignedToEmpContactNumber(dto.getAssignedToEmpContactNumber());
        entity.setAssignedToEmpEmail(dto.getAssignedToEmpEmail());
        entity.setDepartmentName(dto.getDepartmentName());
        entity.setAssigneeTypeName(dto.getAssigneeTypeName());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private AssetAssigneeAuditOldDTO mapToDTO(AssetAssigneeAuditOld entity) {
        AssetAssigneeAuditOldDTO dto = new AssetAssigneeAuditOldDTO();
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
        dto.setAssignedToEmpName(entity.getAssignedToEmpName());
        dto.setAssignedToEmpContactNumber(entity.getAssignedToEmpContactNumber());
        dto.setAssignedToEmpEmail(entity.getAssignedToEmpEmail());
        dto.setDepartmentName(entity.getDepartmentName());
        dto.setAssigneeTypeName(entity.getAssigneeTypeName());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}