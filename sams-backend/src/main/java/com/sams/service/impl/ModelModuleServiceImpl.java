package com.sams.service.impl;

import com.sams.dto.ModelModuleDTO;
import com.sams.entity.ModelModule;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ModelModuleRepository;
import com.sams.service.ModelModuleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModelModuleServiceImpl implements ModelModuleService {

    private final ModelModuleRepository repository;

    @Override
    @Transactional
    public ModelModuleDTO create(ModelModuleDTO dto) {
        ModelModule entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ModelModuleDTO getById(Long id) {
        ModelModule entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelModule not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ModelModuleDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ModelModuleDTO update(Long id, ModelModuleDTO dto) {
        ModelModule entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelModule not found with ID: " + id));
        ModelModule mapped = mapToEntity(dto);
        mapped.setModelModuleId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ModelModule entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelModule not found with ID: " + id));
        repository.delete(entity);
    }

    private ModelModule mapToEntity(ModelModuleDTO dto) {
        ModelModule entity = new ModelModule();
        entity.setModelModuleId(dto.getModelModuleId());
        entity.setOrgId(dto.getOrgId());
        entity.setModelId(dto.getModelId());
        entity.setItemModuleId(dto.getItemModuleId());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ModelModuleDTO mapToDTO(ModelModule entity) {
        ModelModuleDTO dto = new ModelModuleDTO();
        dto.setModelModuleId(entity.getModelModuleId());
        dto.setOrgId(entity.getOrgId());
        dto.setModelId(entity.getModelId());
        dto.setItemModuleId(entity.getItemModuleId());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}