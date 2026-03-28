package com.sams.service.impl;

import com.sams.dto.ModelDocDTO;
import com.sams.entity.ModelDoc;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ModelDocRepository;
import com.sams.service.ModelDocService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModelDocServiceImpl implements ModelDocService {

    private final ModelDocRepository repository;

    @Override
    @Transactional
    public ModelDocDTO create(ModelDocDTO dto) {
        ModelDoc entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ModelDocDTO getById(Long id) {
        ModelDoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelDoc not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ModelDocDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ModelDocDTO update(Long id, ModelDocDTO dto) {
        ModelDoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelDoc not found with ID: " + id));
        ModelDoc mapped = mapToEntity(dto);
        mapped.setModelDocId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ModelDoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelDoc not found with ID: " + id));
        repository.delete(entity);
    }

    private ModelDoc mapToEntity(ModelDocDTO dto) {
        ModelDoc entity = new ModelDoc();
        entity.setModelDocId(dto.getModelDocId());
        entity.setOrgId(dto.getOrgId());
        entity.setModelId(dto.getModelId());
        entity.setDocName(dto.getDocName());
        entity.setDocType(dto.getDocType());
        entity.setFilePath(dto.getFilePath());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setContentType(dto.getContentType());
        return entity;
    }

    private ModelDocDTO mapToDTO(ModelDoc entity) {
        ModelDocDTO dto = new ModelDocDTO();
        dto.setModelDocId(entity.getModelDocId());
        dto.setOrgId(entity.getOrgId());
        dto.setModelId(entity.getModelId());
        dto.setDocName(entity.getDocName());
        dto.setDocType(entity.getDocType());
        dto.setFilePath(entity.getFilePath());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setContentType(entity.getContentType());
        return dto;
    }
}