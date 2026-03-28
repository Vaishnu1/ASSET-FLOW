package com.sams.service.impl;

import com.sams.dto.AssetAssigneeDTO;
import com.sams.entity.AssetAssignee;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetAssigneeRepository;
import com.sams.service.AssetAssigneeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetAssigneeServiceImpl implements AssetAssigneeService {

    private final AssetAssigneeRepository repository;

    @Override
    @Transactional
    public AssetAssigneeDTO createAssetAssignee(AssetAssigneeDTO dto) {
        AssetAssignee entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetAssigneeDTO getAssetAssigneeById(Long id) {
        AssetAssignee entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetAssignee not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetAssigneeDTO> getAllAssetAssignees() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetAssigneeDTO updateAssetAssignee(Long id, AssetAssigneeDTO dto) {
        AssetAssignee entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetAssignee not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        AssetAssignee mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteAssetAssignee(Long id) {
        AssetAssignee entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetAssignee not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetAssignee mapToEntity(AssetAssigneeDTO dto) {
        AssetAssignee entity = new AssetAssignee();
        entity.setAssetAssigneeId(dto.getAssetAssigneeId());
        entity.setAssignedToEmpId(dto.getAssignedToEmpId());
        entity.setAssetId(dto.getAssetId());
        entity.setAssigneeTypeId(dto.getAssigneeTypeId());
        entity.setStartDt(dto.getStartDt());
        entity.setEndDt(dto.getEndDt());
        entity.setDefaultPersonIncharge(dto.getDefaultPersonIncharge());
        entity.setStartDtDisp(dto.getStartDtDisp());
        entity.setEndDtDisp(dto.getEndDtDisp());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedDTDisp(dto.getUpdatedDTDisp());
        entity.setAssigneeTypeName(dto.getAssigneeTypeName());
        entity.setAssignedPersonContactNumber(dto.getAssignedPersonContactNumber());
        entity.setAssignedPersonEmail(dto.getAssignedPersonEmail());
        entity.setAssignToEmpName(dto.getAssignToEmpName());
        entity.setDepartmentName(dto.getDepartmentName());
        entity.setDepartmentId(dto.getDepartmentId());
        entity.setAssetCode(dto.getAssetCode());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setMode(dto.getMode());
        entity.setStatus(dto.getStatus());
        entity.setRejectReason(dto.getRejectReason());
        entity.setUserId(dto.getUserId());
        entity.setCreatedById(dto.getCreatedById());
        entity.setAssignedVolumeLicenseQty(dto.getAssignedVolumeLicenseQty());
        entity.setApprovalStatus(dto.getApprovalStatus());
        entity.setPrimaryTechnician(dto.getPrimaryTechnician());
        entity.setSecondaryTechnician(dto.getSecondaryTechnician());
        entity.setEmpCode(dto.getEmpCode());
        entity.setPmPaTechnician(dto.getPmPaTechnician());
        entity.setQaTechnician(dto.getQaTechnician());
        return entity;
    }

    private AssetAssigneeDTO mapToDTO(AssetAssignee entity) {
        AssetAssigneeDTO dto = new AssetAssigneeDTO();
        dto.setId(entity.getId());
        dto.setAssetAssigneeId(entity.getAssetAssigneeId());
        dto.setAssignedToEmpId(entity.getAssignedToEmpId());
        dto.setAssetId(entity.getAssetId());
        dto.setAssigneeTypeId(entity.getAssigneeTypeId());
        dto.setStartDt(entity.getStartDt());
        dto.setEndDt(entity.getEndDt());
        dto.setDefaultPersonIncharge(entity.getDefaultPersonIncharge());
        dto.setStartDtDisp(entity.getStartDtDisp());
        dto.setEndDtDisp(entity.getEndDtDisp());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedDTDisp(entity.getUpdatedDTDisp());
        dto.setAssigneeTypeName(entity.getAssigneeTypeName());
        dto.setAssignedPersonContactNumber(entity.getAssignedPersonContactNumber());
        dto.setAssignedPersonEmail(entity.getAssignedPersonEmail());
        dto.setAssignToEmpName(entity.getAssignToEmpName());
        dto.setDepartmentName(entity.getDepartmentName());
        dto.setDepartmentId(entity.getDepartmentId());
        dto.setAssetCode(entity.getAssetCode());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setMode(entity.getMode());
        dto.setStatus(entity.getStatus());
        dto.setRejectReason(entity.getRejectReason());
        dto.setUserId(entity.getUserId());
        dto.setCreatedById(entity.getCreatedById());
        dto.setAssignedVolumeLicenseQty(entity.getAssignedVolumeLicenseQty());
        dto.setApprovalStatus(entity.getApprovalStatus());
        dto.setPrimaryTechnician(entity.getPrimaryTechnician());
        dto.setSecondaryTechnician(entity.getSecondaryTechnician());
        dto.setEmpCode(entity.getEmpCode());
        dto.setPmPaTechnician(entity.getPmPaTechnician());
        dto.setQaTechnician(entity.getQaTechnician());
        return dto;
    }
}