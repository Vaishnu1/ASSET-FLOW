package com.sams.service.impl;

import com.sams.dto.PhysicalAuditVerificationDTO;
import com.sams.entity.PhysicalAuditVerification;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PhysicalAuditVerificationRepository;
import com.sams.service.PhysicalAuditVerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PhysicalAuditVerificationServiceImpl implements PhysicalAuditVerificationService {

    private final PhysicalAuditVerificationRepository repository;

    @Override
    @Transactional
    public PhysicalAuditVerificationDTO create(PhysicalAuditVerificationDTO dto) {
        PhysicalAuditVerification entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PhysicalAuditVerificationDTO getById(Long id) {
        PhysicalAuditVerification entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PhysicalAuditVerification not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PhysicalAuditVerificationDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PhysicalAuditVerificationDTO update(Long id, PhysicalAuditVerificationDTO dto) {
        PhysicalAuditVerification entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PhysicalAuditVerification not found with ID: " + id));
        PhysicalAuditVerification mapped = mapToEntity(dto);
        mapped.setAssetPhysicalVerificationDtlId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PhysicalAuditVerification entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PhysicalAuditVerification not found with ID: " + id));
        repository.delete(entity);
    }

    private PhysicalAuditVerification mapToEntity(PhysicalAuditVerificationDTO dto) {
        PhysicalAuditVerification entity = new PhysicalAuditVerification();
        entity.setAssetPhysicalVerificationDtlId(dto.getAssetPhysicalVerificationDtlId());
        entity.setAssetPhysicalAuditHdrId(dto.getAssetPhysicalAuditHdrId());
        entity.setAssetPhysicalAuditDtlIdNew(dto.getAssetPhysicalAuditDtlIdNew());
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
        entity.setAssetImageFilePath(dto.getAssetImageFilePath());
        entity.setVarianceFlag(dto.getVarianceFlag());
        entity.setNewlyFoundAsset(dto.getNewlyFoundAsset());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setAuditRemarks(dto.getAuditRemarks());
        entity.setLatitude(dto.getLatitude());
        entity.setLongitude(dto.getLongitude());
        entity.setAddress(dto.getAddress());
        entity.setSerialNumber(dto.getSerialNumber());
        return entity;
    }

    private PhysicalAuditVerificationDTO mapToDTO(PhysicalAuditVerification entity) {
        PhysicalAuditVerificationDTO dto = new PhysicalAuditVerificationDTO();
        dto.setAssetPhysicalVerificationDtlId(entity.getAssetPhysicalVerificationDtlId());
        dto.setAssetPhysicalAuditHdrId(entity.getAssetPhysicalAuditHdrId());
        dto.setAssetPhysicalAuditDtlIdNew(entity.getAssetPhysicalAuditDtlIdNew());
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
        dto.setAssetImageFilePath(entity.getAssetImageFilePath());
        dto.setVarianceFlag(entity.getVarianceFlag());
        dto.setNewlyFoundAsset(entity.getNewlyFoundAsset());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setAuditRemarks(entity.getAuditRemarks());
        dto.setLatitude(entity.getLatitude());
        dto.setLongitude(entity.getLongitude());
        dto.setAddress(entity.getAddress());
        dto.setSerialNumber(entity.getSerialNumber());
        return dto;
    }
}