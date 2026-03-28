package com.sams.service.impl;

import com.sams.dto.ModelChildDTO;
import com.sams.entity.ModelChild;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ModelChildRepository;
import com.sams.service.ModelChildService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModelChildServiceImpl implements ModelChildService {

    private final ModelChildRepository repository;

    @Override
    @Transactional
    public ModelChildDTO create(ModelChildDTO dto) {
        ModelChild entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ModelChildDTO getById(Long id) {
        ModelChild entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelChild not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ModelChildDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ModelChildDTO update(Long id, ModelChildDTO dto) {
        ModelChild entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelChild not found with ID: " + id));
        ModelChild mapped = mapToEntity(dto);
        mapped.setModelChildId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ModelChild entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelChild not found with ID: " + id));
        repository.delete(entity);
    }

    private ModelChild mapToEntity(ModelChildDTO dto) {
        ModelChild entity = new ModelChild();
        entity.setModelChildId(dto.getModelChildId());
        entity.setOrgId(dto.getOrgId());
        entity.setParentModelId(dto.getParentModelId());
        entity.setChildModelId(dto.getChildModelId());
        entity.setChildAssetGroupId(dto.getChildAssetGroupId());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ModelChildDTO mapToDTO(ModelChild entity) {
        ModelChildDTO dto = new ModelChildDTO();
        dto.setModelChildId(entity.getModelChildId());
        dto.setOrgId(entity.getOrgId());
        dto.setParentModelId(entity.getParentModelId());
        dto.setChildModelId(entity.getChildModelId());
        dto.setChildAssetGroupId(entity.getChildAssetGroupId());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}