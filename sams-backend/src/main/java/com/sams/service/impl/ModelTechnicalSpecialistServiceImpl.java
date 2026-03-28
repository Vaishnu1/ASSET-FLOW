package com.sams.service.impl;

import com.sams.dto.ModelTechnicalSpecialistDTO;
import com.sams.entity.ModelTechnicalSpecialist;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ModelTechnicalSpecialistRepository;
import com.sams.service.ModelTechnicalSpecialistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModelTechnicalSpecialistServiceImpl implements ModelTechnicalSpecialistService {

    private final ModelTechnicalSpecialistRepository repository;

    @Override
    @Transactional
    public ModelTechnicalSpecialistDTO create(ModelTechnicalSpecialistDTO dto) {
        ModelTechnicalSpecialist entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ModelTechnicalSpecialistDTO getById(Long id) {
        ModelTechnicalSpecialist entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelTechnicalSpecialist not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ModelTechnicalSpecialistDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ModelTechnicalSpecialistDTO update(Long id, ModelTechnicalSpecialistDTO dto) {
        ModelTechnicalSpecialist entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelTechnicalSpecialist not found with ID: " + id));
        ModelTechnicalSpecialist mapped = mapToEntity(dto);
        mapped.setModelSpecialistId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ModelTechnicalSpecialist entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelTechnicalSpecialist not found with ID: " + id));
        repository.delete(entity);
    }

    private ModelTechnicalSpecialist mapToEntity(ModelTechnicalSpecialistDTO dto) {
        ModelTechnicalSpecialist entity = new ModelTechnicalSpecialist();
        entity.setModelSpecialistId(dto.getModelSpecialistId());
        entity.setModelId(dto.getModelId());
        entity.setSpecialistOrgType(dto.getSpecialistOrgType());
        entity.setSpecialistId(dto.getSpecialistId());
        entity.setSpecialistName(dto.getSpecialistName());
        entity.setExtEngineerOrgName(dto.getExtEngineerOrgName());
        entity.setExtEngineerContactNo(dto.getExtEngineerContactNo());
        entity.setExtEngineerEmailId(dto.getExtEngineerEmailId());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ModelTechnicalSpecialistDTO mapToDTO(ModelTechnicalSpecialist entity) {
        ModelTechnicalSpecialistDTO dto = new ModelTechnicalSpecialistDTO();
        dto.setModelSpecialistId(entity.getModelSpecialistId());
        dto.setModelId(entity.getModelId());
        dto.setSpecialistOrgType(entity.getSpecialistOrgType());
        dto.setSpecialistId(entity.getSpecialistId());
        dto.setSpecialistName(entity.getSpecialistName());
        dto.setExtEngineerOrgName(entity.getExtEngineerOrgName());
        dto.setExtEngineerContactNo(entity.getExtEngineerContactNo());
        dto.setExtEngineerEmailId(entity.getExtEngineerEmailId());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}