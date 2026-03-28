package com.sams.service.impl;

import com.sams.dto.CheckPointTestEquipmentDTO;
import com.sams.entity.CheckPointTestEquipment;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.CheckPointTestEquipmentRepository;
import com.sams.service.CheckPointTestEquipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CheckPointTestEquipmentServiceImpl implements CheckPointTestEquipmentService {

    private final CheckPointTestEquipmentRepository repository;

    @Override
    @Transactional
    public CheckPointTestEquipmentDTO create(CheckPointTestEquipmentDTO dto) {
        CheckPointTestEquipment entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public CheckPointTestEquipmentDTO getById(Long id) {
        CheckPointTestEquipment entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CheckPointTestEquipment not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<CheckPointTestEquipmentDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CheckPointTestEquipmentDTO update(Long id, CheckPointTestEquipmentDTO dto) {
        CheckPointTestEquipment entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CheckPointTestEquipment not found with ID: " + id));
        CheckPointTestEquipment mapped = mapToEntity(dto);
        mapped.setTestEqptId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        CheckPointTestEquipment entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CheckPointTestEquipment not found with ID: " + id));
        repository.delete(entity);
    }

    private CheckPointTestEquipment mapToEntity(CheckPointTestEquipmentDTO dto) {
        CheckPointTestEquipment entity = new CheckPointTestEquipment();
        entity.setTestEqptId(dto.getTestEqptId());
        entity.setCheckPointsId(dto.getCheckPointsId());
        entity.setSrId(dto.getSrId());
        entity.setSrNo(dto.getSrNo());
        entity.setAssetId(dto.getAssetId());
        entity.setAssetCode(dto.getAssetCode());
        entity.setModelId(dto.getModelId());
        entity.setModelName(dto.getModelName());
        entity.setAssetGroupId(dto.getAssetGroupId());
        entity.setAssetGroupName(dto.getAssetGroupName());
        entity.setManufacturerId(dto.getManufacturerId());
        entity.setManufacturerName(dto.getManufacturerName());
        entity.setLastPaDoneDate(dto.getLastPaDoneDate());
        entity.setDueDate(dto.getDueDate());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private CheckPointTestEquipmentDTO mapToDTO(CheckPointTestEquipment entity) {
        CheckPointTestEquipmentDTO dto = new CheckPointTestEquipmentDTO();
        dto.setTestEqptId(entity.getTestEqptId());
        dto.setCheckPointsId(entity.getCheckPointsId());
        dto.setSrId(entity.getSrId());
        dto.setSrNo(entity.getSrNo());
        dto.setAssetId(entity.getAssetId());
        dto.setAssetCode(entity.getAssetCode());
        dto.setModelId(entity.getModelId());
        dto.setModelName(entity.getModelName());
        dto.setAssetGroupId(entity.getAssetGroupId());
        dto.setAssetGroupName(entity.getAssetGroupName());
        dto.setManufacturerId(entity.getManufacturerId());
        dto.setManufacturerName(entity.getManufacturerName());
        dto.setLastPaDoneDate(entity.getLastPaDoneDate());
        dto.setDueDate(entity.getDueDate());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}