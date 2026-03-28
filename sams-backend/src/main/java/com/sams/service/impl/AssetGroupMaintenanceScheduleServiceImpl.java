package com.sams.service.impl;

import com.sams.dto.AssetGroupMaintenanceScheduleDTO;
import com.sams.entity.AssetGroupMaintenanceSchedule;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.AssetGroupMaintenanceScheduleRepository;
import com.sams.service.AssetGroupMaintenanceScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetGroupMaintenanceScheduleServiceImpl implements AssetGroupMaintenanceScheduleService {

    private final AssetGroupMaintenanceScheduleRepository repository;

    @Override
    @Transactional
    public AssetGroupMaintenanceScheduleDTO create(AssetGroupMaintenanceScheduleDTO dto) {
        AssetGroupMaintenanceSchedule entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public AssetGroupMaintenanceScheduleDTO getById(Long id) {
        AssetGroupMaintenanceSchedule entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetGroupMaintenanceSchedule not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<AssetGroupMaintenanceScheduleDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetGroupMaintenanceScheduleDTO update(Long id, AssetGroupMaintenanceScheduleDTO dto) {
        AssetGroupMaintenanceSchedule entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetGroupMaintenanceSchedule not found with ID: " + id));
        AssetGroupMaintenanceSchedule mapped = mapToEntity(dto);
        mapped.setAssetGroupMaintenanceScheduleId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        AssetGroupMaintenanceSchedule entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AssetGroupMaintenanceSchedule not found with ID: " + id));
        repository.delete(entity);
    }

    private AssetGroupMaintenanceSchedule mapToEntity(AssetGroupMaintenanceScheduleDTO dto) {
        AssetGroupMaintenanceSchedule entity = new AssetGroupMaintenanceSchedule();
        entity.setAssetGroupMaintenanceScheduleId(dto.getAssetGroupMaintenanceScheduleId());
        entity.setOrgId(dto.getOrgId());
        entity.setAssetGroupId(dto.getAssetGroupId());
        entity.setMaintScheduleTypeId(dto.getMaintScheduleTypeId());
        entity.setMaintScheduleFrequncyId(dto.getMaintScheduleFrequncyId());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private AssetGroupMaintenanceScheduleDTO mapToDTO(AssetGroupMaintenanceSchedule entity) {
        AssetGroupMaintenanceScheduleDTO dto = new AssetGroupMaintenanceScheduleDTO();
        dto.setAssetGroupMaintenanceScheduleId(entity.getAssetGroupMaintenanceScheduleId());
        dto.setOrgId(entity.getOrgId());
        dto.setAssetGroupId(entity.getAssetGroupId());
        dto.setMaintScheduleTypeId(entity.getMaintScheduleTypeId());
        dto.setMaintScheduleFrequncyId(entity.getMaintScheduleFrequncyId());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}