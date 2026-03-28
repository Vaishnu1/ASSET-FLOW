package com.sams.service.impl;

import com.sams.dto.AssetPhysicalAuditDtlDTO;
import com.sams.entity.AssetPhysicalAuditDtl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetPhysicalAuditDtlRepository;
import com.sams.service.AssetPhysicalAuditDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetPhysicalAuditDtlServiceImpl implements AssetPhysicalAuditDtlService {

    private final AssetPhysicalAuditDtlRepository repository;

    @Override
    @Transactional
    public AssetPhysicalAuditDtlDTO create(AssetPhysicalAuditDtlDTO dto) {
        AssetPhysicalAuditDtl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetPhysicalAuditDtlDTO getById(Long id) {
        AssetPhysicalAuditDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetPhysicalAuditDtl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetPhysicalAuditDtlDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetPhysicalAuditDtlDTO update(Long id, AssetPhysicalAuditDtlDTO dto) {
        AssetPhysicalAuditDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetPhysicalAuditDtl not found with ID: " + id));
        AssetPhysicalAuditDtl mapped = mapToEntity(dto);
        mapped.setAssetPhysicalAuditDtlId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AssetPhysicalAuditDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetPhysicalAuditDtl not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetPhysicalAuditDtl mapToEntity(AssetPhysicalAuditDtlDTO dto) {
        AssetPhysicalAuditDtl entity = new AssetPhysicalAuditDtl();
        entity.setAssetPhysicalAuditDtlId(dto.getAssetPhysicalAuditDtlId());
        entity.setAssetPhysicalAuditHdrId(dto.getAssetPhysicalAuditHdrId());
        entity.setAssetHdrId(dto.getAssetHdrId());
        entity.setAssetCode(dto.getAssetCode());
        entity.setDepartmentId(dto.getDepartmentId());
        entity.setDepartmentName(dto.getDepartmentName());
        entity.setSubDepartment(dto.getSubDepartment());
        entity.setSubDepartmentId(dto.getSubDepartmentId());
        entity.setAssetStatusId(dto.getAssetStatusId());
        entity.setAssetConditionId(dto.getAssetConditionId());
        entity.setNewDepartmentId(dto.getNewDepartmentId());
        entity.setNewDepartmentName(dto.getNewDepartmentName());
        entity.setNewSubDepartment(dto.getNewSubDepartment());
        entity.setNewSubDepartmentId(dto.getNewSubDepartmentId());
        entity.setNewAssetStatusId(dto.getNewAssetStatusId());
        entity.setNewAssetConditionId(dto.getNewAssetConditionId());
        entity.setStatusTypeId(dto.getStatusTypeId());
        entity.setNewStatusTypeId(dto.getNewStatusTypeId());
        entity.setBlockId(dto.getBlockId());
        entity.setBlockName(dto.getBlockName());
        entity.setFloorId(dto.getFloorId());
        entity.setFloorName(dto.getFloorName());
        entity.setSegmentId(dto.getSegmentId());
        entity.setSegmentName(dto.getSegmentName());
        entity.setRoomId(dto.getRoomId());
        entity.setRoomName(dto.getRoomName());
        entity.setNewBlockId(dto.getNewBlockId());
        entity.setNewBlockName(dto.getNewBlockName());
        entity.setNewFloorId(dto.getNewFloorId());
        entity.setNewFloorName(dto.getNewFloorName());
        entity.setNewSegmentId(dto.getNewSegmentId());
        entity.setNewSegmentName(dto.getNewSegmentName());
        entity.setNewRoomId(dto.getNewRoomId());
        entity.setNewRoomName(dto.getNewRoomName());
        entity.setAgeCriteria(dto.getAgeCriteria());
        entity.setAssetAge(dto.getAssetAge());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private AssetPhysicalAuditDtlDTO mapToDTO(AssetPhysicalAuditDtl entity) {
        AssetPhysicalAuditDtlDTO dto = new AssetPhysicalAuditDtlDTO();
        dto.setAssetPhysicalAuditDtlId(entity.getAssetPhysicalAuditDtlId());
        dto.setAssetPhysicalAuditHdrId(entity.getAssetPhysicalAuditHdrId());
        dto.setAssetHdrId(entity.getAssetHdrId());
        dto.setAssetCode(entity.getAssetCode());
        dto.setDepartmentId(entity.getDepartmentId());
        dto.setDepartmentName(entity.getDepartmentName());
        dto.setSubDepartment(entity.getSubDepartment());
        dto.setSubDepartmentId(entity.getSubDepartmentId());
        dto.setAssetStatusId(entity.getAssetStatusId());
        dto.setAssetConditionId(entity.getAssetConditionId());
        dto.setNewDepartmentId(entity.getNewDepartmentId());
        dto.setNewDepartmentName(entity.getNewDepartmentName());
        dto.setNewSubDepartment(entity.getNewSubDepartment());
        dto.setNewSubDepartmentId(entity.getNewSubDepartmentId());
        dto.setNewAssetStatusId(entity.getNewAssetStatusId());
        dto.setNewAssetConditionId(entity.getNewAssetConditionId());
        dto.setStatusTypeId(entity.getStatusTypeId());
        dto.setNewStatusTypeId(entity.getNewStatusTypeId());
        dto.setBlockId(entity.getBlockId());
        dto.setBlockName(entity.getBlockName());
        dto.setFloorId(entity.getFloorId());
        dto.setFloorName(entity.getFloorName());
        dto.setSegmentId(entity.getSegmentId());
        dto.setSegmentName(entity.getSegmentName());
        dto.setRoomId(entity.getRoomId());
        dto.setRoomName(entity.getRoomName());
        dto.setNewBlockId(entity.getNewBlockId());
        dto.setNewBlockName(entity.getNewBlockName());
        dto.setNewFloorId(entity.getNewFloorId());
        dto.setNewFloorName(entity.getNewFloorName());
        dto.setNewSegmentId(entity.getNewSegmentId());
        dto.setNewSegmentName(entity.getNewSegmentName());
        dto.setNewRoomId(entity.getNewRoomId());
        dto.setNewRoomName(entity.getNewRoomName());
        dto.setAgeCriteria(entity.getAgeCriteria());
        dto.setAssetAge(entity.getAssetAge());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}