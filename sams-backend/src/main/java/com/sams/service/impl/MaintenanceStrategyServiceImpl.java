package com.sams.service.impl;

import com.sams.dto.MaintenanceStrategyDTO;
import com.sams.entity.MaintenanceStrategy;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.MaintenanceStrategyRepository;
import com.sams.service.MaintenanceStrategyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MaintenanceStrategyServiceImpl implements MaintenanceStrategyService {

    private final MaintenanceStrategyRepository repository;

    @Override
    @Transactional
    public MaintenanceStrategyDTO create(MaintenanceStrategyDTO dto) {
        MaintenanceStrategy entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public MaintenanceStrategyDTO getById(Long id) {
        MaintenanceStrategy entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("MaintenanceStrategy not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<MaintenanceStrategyDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public MaintenanceStrategyDTO update(Long id, MaintenanceStrategyDTO dto) {
        MaintenanceStrategy entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("MaintenanceStrategy not found with ID: " + id));
        MaintenanceStrategy mapped = mapToEntity(dto);
        mapped.setMaintenanceStrategyId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        MaintenanceStrategy entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("MaintenanceStrategy not found with ID: " + id));
        repository.delete(entity);
    }

    private MaintenanceStrategy mapToEntity(MaintenanceStrategyDTO dto) {
        MaintenanceStrategy entity = new MaintenanceStrategy();
        entity.setMaintenanceStrategyId(dto.getMaintenanceStrategyId());
        entity.setOrgId(dto.getOrgId());
        entity.setMaintenanceStrategyName(dto.getMaintenanceStrategyName());
        entity.setMaintenanceStrategyType(dto.getMaintenanceStrategyType());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private MaintenanceStrategyDTO mapToDTO(MaintenanceStrategy entity) {
        MaintenanceStrategyDTO dto = new MaintenanceStrategyDTO();
        dto.setMaintenanceStrategyId(entity.getMaintenanceStrategyId());
        dto.setOrgId(entity.getOrgId());
        dto.setMaintenanceStrategyName(entity.getMaintenanceStrategyName());
        dto.setMaintenanceStrategyType(entity.getMaintenanceStrategyType());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}