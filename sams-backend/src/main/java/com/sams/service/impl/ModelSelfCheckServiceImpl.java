package com.sams.service.impl;

import com.sams.dto.ModelSelfCheckDTO;
import com.sams.entity.ModelSelfCheck;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ModelSelfCheckRepository;
import com.sams.service.ModelSelfCheckService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModelSelfCheckServiceImpl implements ModelSelfCheckService {

    private final ModelSelfCheckRepository repository;

    @Override
    @Transactional
    public ModelSelfCheckDTO create(ModelSelfCheckDTO dto) {
        ModelSelfCheck entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ModelSelfCheckDTO getById(Long id) {
        ModelSelfCheck entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelSelfCheck not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ModelSelfCheckDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ModelSelfCheckDTO update(Long id, ModelSelfCheckDTO dto) {
        ModelSelfCheck entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelSelfCheck not found with ID: " + id));
        ModelSelfCheck mapped = mapToEntity(dto);
        mapped.setModelSelfCheckId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ModelSelfCheck entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelSelfCheck not found with ID: " + id));
        repository.delete(entity);
    }

    private ModelSelfCheck mapToEntity(ModelSelfCheckDTO dto) {
        ModelSelfCheck entity = new ModelSelfCheck();
        entity.setModelSelfCheckId(dto.getModelSelfCheckId());
        entity.setOrgId(dto.getOrgId());
        entity.setModelId(dto.getModelId());
        entity.setDefectType(dto.getDefectType());
        entity.setDefectTag(dto.getDefectTag());
        entity.setDefectQuestion(dto.getDefectQuestion());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ModelSelfCheckDTO mapToDTO(ModelSelfCheck entity) {
        ModelSelfCheckDTO dto = new ModelSelfCheckDTO();
        dto.setModelSelfCheckId(entity.getModelSelfCheckId());
        dto.setOrgId(entity.getOrgId());
        dto.setModelId(entity.getModelId());
        dto.setDefectType(entity.getDefectType());
        dto.setDefectTag(entity.getDefectTag());
        dto.setDefectQuestion(entity.getDefectQuestion());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}