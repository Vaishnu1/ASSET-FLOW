package com.sams.service.impl;

import com.sams.dto.ModelCheckPointsDTO;
import com.sams.entity.ModelCheckPoints;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ModelCheckPointsRepository;
import com.sams.service.ModelCheckPointsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModelCheckPointsServiceImpl implements ModelCheckPointsService {

    private final ModelCheckPointsRepository repository;

    @Override
    @Transactional
    public ModelCheckPointsDTO createModelCheckPoints(ModelCheckPointsDTO dto) {
        ModelCheckPoints entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ModelCheckPointsDTO getModelCheckPointsById(Long id) {
        ModelCheckPoints entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelCheckPoints not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ModelCheckPointsDTO> getAllModelCheckPointses() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ModelCheckPointsDTO updateModelCheckPoints(Long id, ModelCheckPointsDTO dto) {
        ModelCheckPoints entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelCheckPoints not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        ModelCheckPoints mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteModelCheckPoints(Long id) {
        ModelCheckPoints entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelCheckPoints not found with ID: " + id));
        repository.delete(entity);
    }

    private ModelCheckPoints mapToEntity(ModelCheckPointsDTO dto) {
        ModelCheckPoints entity = new ModelCheckPoints();
        entity.setOrgId(dto.getOrgId());
        entity.setAssetGroupId(dto.getAssetGroupId());
        entity.setModelId(dto.getModelId());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        return entity;
    }

    private ModelCheckPointsDTO mapToDTO(ModelCheckPoints entity) {
        ModelCheckPointsDTO dto = new ModelCheckPointsDTO();
        dto.setId(entity.getId());
        dto.setOrgId(entity.getOrgId());
        dto.setAssetGroupId(entity.getAssetGroupId());
        dto.setModelId(entity.getModelId());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        return dto;
    }
}