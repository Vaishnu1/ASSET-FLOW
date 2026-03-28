package com.sams.service.impl;

import com.sams.dto.ModelImageDTO;
import com.sams.entity.ModelImage;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ModelImageRepository;
import com.sams.service.ModelImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModelImageServiceImpl implements ModelImageService {

    private final ModelImageRepository repository;

    @Override
    @Transactional
    public ModelImageDTO create(ModelImageDTO dto) {
        ModelImage entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ModelImageDTO getById(Long id) {
        ModelImage entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelImage not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ModelImageDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ModelImageDTO update(Long id, ModelImageDTO dto) {
        ModelImage entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelImage not found with ID: " + id));
        ModelImage mapped = mapToEntity(dto);
        mapped.setModelImageId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ModelImage entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelImage not found with ID: " + id));
        repository.delete(entity);
    }

    private ModelImage mapToEntity(ModelImageDTO dto) {
        ModelImage entity = new ModelImage();
        entity.setModelImageId(dto.getModelImageId());
        entity.setOrgId(dto.getOrgId());
        entity.setModelId(dto.getModelId());
        entity.setImageName(dto.getImageName());
        entity.setImageType(dto.getImageType());
        entity.setFilePath(dto.getFilePath());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ModelImageDTO mapToDTO(ModelImage entity) {
        ModelImageDTO dto = new ModelImageDTO();
        dto.setModelImageId(entity.getModelImageId());
        dto.setOrgId(entity.getOrgId());
        dto.setModelId(entity.getModelId());
        dto.setImageName(entity.getImageName());
        dto.setImageType(entity.getImageType());
        dto.setFilePath(entity.getFilePath());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}