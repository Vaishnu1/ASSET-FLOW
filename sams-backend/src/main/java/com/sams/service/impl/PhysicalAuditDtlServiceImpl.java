package com.sams.service.impl;

import com.sams.dto.PhysicalAuditDtlDTO;
import com.sams.entity.PhysicalAuditDtl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PhysicalAuditDtlRepository;
import com.sams.service.PhysicalAuditDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PhysicalAuditDtlServiceImpl implements PhysicalAuditDtlService {

    private final PhysicalAuditDtlRepository repository;

    @Override
    @Transactional
    public PhysicalAuditDtlDTO create(PhysicalAuditDtlDTO dto) {
        PhysicalAuditDtl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PhysicalAuditDtlDTO getById(Long id) {
        PhysicalAuditDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PhysicalAuditDtl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PhysicalAuditDtlDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PhysicalAuditDtlDTO update(Long id, PhysicalAuditDtlDTO dto) {
        PhysicalAuditDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PhysicalAuditDtl not found with ID: " + id));
        PhysicalAuditDtl mapped = mapToEntity(dto);
        mapped.setAssetPhysicalAuditDtlIdNew(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PhysicalAuditDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PhysicalAuditDtl not found with ID: " + id));
        repository.delete(entity);
    }

    private PhysicalAuditDtl mapToEntity(PhysicalAuditDtlDTO dto) {
        PhysicalAuditDtl entity = new PhysicalAuditDtl();
        entity.setAssetPhysicalAuditDtlIdNew(dto.getAssetPhysicalAuditDtlIdNew());
        entity.setAssetPhysicalAuditHdrId(dto.getAssetPhysicalAuditHdrId());
        entity.setAssetHdrId(dto.getAssetHdrId());
        entity.setAssetCode(dto.getAssetCode());
        entity.setDepartmentId(dto.getDepartmentId());
        entity.setDepartmentName(dto.getDepartmentName());
        entity.setSubDepartmentId(dto.getSubDepartmentId());
        entity.setSubDepartment(dto.getSubDepartment());
        entity.setAssetStatusId(dto.getAssetStatusId());
        entity.setFunctionalStatus(dto.getFunctionalStatus());
        entity.setBlockId(dto.getBlockId());
        entity.setBlockName(dto.getBlockName());
        entity.setFloorId(dto.getFloorId());
        entity.setFloorName(dto.getFloorName());
        entity.setSegmentId(dto.getSegmentId());
        entity.setSegmentName(dto.getSegmentName());
        entity.setRoomId(dto.getRoomId());
        entity.setRoomName(dto.getRoomName());
        entity.setAgeCriteria(dto.getAgeCriteria());
        entity.setAssetAge(dto.getAssetAge());
        entity.setAssetConditionId(dto.getAssetConditionId());
        entity.setStatusTypeId(dto.getStatusTypeId());
        entity.setVerificationStatus(dto.getVerificationStatus());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setSerialNumber(dto.getSerialNumber());
        entity.setNotFoundRemarks(dto.getNotFoundRemarks());
        return entity;
    }

    private PhysicalAuditDtlDTO mapToDTO(PhysicalAuditDtl entity) {
        PhysicalAuditDtlDTO dto = new PhysicalAuditDtlDTO();
        dto.setAssetPhysicalAuditDtlIdNew(entity.getAssetPhysicalAuditDtlIdNew());
        dto.setAssetPhysicalAuditHdrId(entity.getAssetPhysicalAuditHdrId());
        dto.setAssetHdrId(entity.getAssetHdrId());
        dto.setAssetCode(entity.getAssetCode());
        dto.setDepartmentId(entity.getDepartmentId());
        dto.setDepartmentName(entity.getDepartmentName());
        dto.setSubDepartmentId(entity.getSubDepartmentId());
        dto.setSubDepartment(entity.getSubDepartment());
        dto.setAssetStatusId(entity.getAssetStatusId());
        dto.setFunctionalStatus(entity.getFunctionalStatus());
        dto.setBlockId(entity.getBlockId());
        dto.setBlockName(entity.getBlockName());
        dto.setFloorId(entity.getFloorId());
        dto.setFloorName(entity.getFloorName());
        dto.setSegmentId(entity.getSegmentId());
        dto.setSegmentName(entity.getSegmentName());
        dto.setRoomId(entity.getRoomId());
        dto.setRoomName(entity.getRoomName());
        dto.setAgeCriteria(entity.getAgeCriteria());
        dto.setAssetAge(entity.getAssetAge());
        dto.setAssetConditionId(entity.getAssetConditionId());
        dto.setStatusTypeId(entity.getStatusTypeId());
        dto.setVerificationStatus(entity.getVerificationStatus());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setSerialNumber(entity.getSerialNumber());
        dto.setNotFoundRemarks(entity.getNotFoundRemarks());
        return dto;
    }
}