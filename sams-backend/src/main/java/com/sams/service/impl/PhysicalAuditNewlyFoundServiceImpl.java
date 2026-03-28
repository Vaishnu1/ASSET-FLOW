package com.sams.service.impl;

import com.sams.dto.PhysicalAuditNewlyFoundDTO;
import com.sams.entity.PhysicalAuditNewlyFound;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PhysicalAuditNewlyFoundRepository;
import com.sams.service.PhysicalAuditNewlyFoundService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PhysicalAuditNewlyFoundServiceImpl implements PhysicalAuditNewlyFoundService {

    private final PhysicalAuditNewlyFoundRepository repository;

    @Override
    @Transactional
    public PhysicalAuditNewlyFoundDTO create(PhysicalAuditNewlyFoundDTO dto) {
        PhysicalAuditNewlyFound entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PhysicalAuditNewlyFoundDTO getById(Long id) {
        PhysicalAuditNewlyFound entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PhysicalAuditNewlyFound not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PhysicalAuditNewlyFoundDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PhysicalAuditNewlyFoundDTO update(Long id, PhysicalAuditNewlyFoundDTO dto) {
        PhysicalAuditNewlyFound entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PhysicalAuditNewlyFound not found with ID: " + id));
        PhysicalAuditNewlyFound mapped = mapToEntity(dto);
        mapped.setNewlyFoundAssetId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PhysicalAuditNewlyFound entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PhysicalAuditNewlyFound not found with ID: " + id));
        repository.delete(entity);
    }

    private PhysicalAuditNewlyFound mapToEntity(PhysicalAuditNewlyFoundDTO dto) {
        PhysicalAuditNewlyFound entity = new PhysicalAuditNewlyFound();
        entity.setNewlyFoundAssetId(dto.getNewlyFoundAssetId());
        entity.setAssetPhysicalAuditHdrId(dto.getAssetPhysicalAuditHdrId());
        entity.setAssetCode(dto.getAssetCode());
        entity.setModel(dto.getModel());
        entity.setDepartmentName(dto.getDepartmentName());
        entity.setSubDepartment(dto.getSubDepartment());
        entity.setAssetStatus(dto.getAssetStatus());
        entity.setBlockName(dto.getBlockName());
        entity.setFloorName(dto.getFloorName());
        entity.setRoomName(dto.getRoomName());
        entity.setAssetCondition(dto.getAssetCondition());
        entity.setRemarks(dto.getRemarks());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setManufacturer(dto.getManufacturer());
        entity.setAssetConditionId(dto.getAssetConditionId());
        entity.setAssetStatusId(dto.getAssetStatusId());
        entity.setSerialNumber(dto.getSerialNumber());
        entity.setAssetGroup(dto.getAssetGroup());
        entity.setRoomId(dto.getRoomId());
        return entity;
    }

    private PhysicalAuditNewlyFoundDTO mapToDTO(PhysicalAuditNewlyFound entity) {
        PhysicalAuditNewlyFoundDTO dto = new PhysicalAuditNewlyFoundDTO();
        dto.setNewlyFoundAssetId(entity.getNewlyFoundAssetId());
        dto.setAssetPhysicalAuditHdrId(entity.getAssetPhysicalAuditHdrId());
        dto.setAssetCode(entity.getAssetCode());
        dto.setModel(entity.getModel());
        dto.setDepartmentName(entity.getDepartmentName());
        dto.setSubDepartment(entity.getSubDepartment());
        dto.setAssetStatus(entity.getAssetStatus());
        dto.setBlockName(entity.getBlockName());
        dto.setFloorName(entity.getFloorName());
        dto.setRoomName(entity.getRoomName());
        dto.setAssetCondition(entity.getAssetCondition());
        dto.setRemarks(entity.getRemarks());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setManufacturer(entity.getManufacturer());
        dto.setAssetConditionId(entity.getAssetConditionId());
        dto.setAssetStatusId(entity.getAssetStatusId());
        dto.setSerialNumber(entity.getSerialNumber());
        dto.setAssetGroup(entity.getAssetGroup());
        dto.setRoomId(entity.getRoomId());
        return dto;
    }
}