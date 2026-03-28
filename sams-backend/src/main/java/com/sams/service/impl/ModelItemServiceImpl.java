package com.sams.service.impl;

import com.sams.dto.ModelItemDTO;
import com.sams.entity.ModelItem;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ModelItemRepository;
import com.sams.service.ModelItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModelItemServiceImpl implements ModelItemService {

    private final ModelItemRepository repository;

    @Override
    @Transactional
    public ModelItemDTO create(ModelItemDTO dto) {
        ModelItem entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ModelItemDTO getById(Long id) {
        ModelItem entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelItem not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ModelItemDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ModelItemDTO update(Long id, ModelItemDTO dto) {
        ModelItem entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelItem not found with ID: " + id));
        ModelItem mapped = mapToEntity(dto);
        mapped.setModelItemId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ModelItem entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelItem not found with ID: " + id));
        repository.delete(entity);
    }

    private ModelItem mapToEntity(ModelItemDTO dto) {
        ModelItem entity = new ModelItem();
        entity.setModelItemId(dto.getModelItemId());
        entity.setOrgId(dto.getOrgId());
        entity.setModelId(dto.getModelId());
        entity.setItemId(dto.getItemId());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ModelItemDTO mapToDTO(ModelItem entity) {
        ModelItemDTO dto = new ModelItemDTO();
        dto.setModelItemId(entity.getModelItemId());
        dto.setOrgId(entity.getOrgId());
        dto.setModelId(entity.getModelId());
        dto.setItemId(entity.getItemId());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}