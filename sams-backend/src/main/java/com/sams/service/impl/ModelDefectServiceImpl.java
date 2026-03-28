package com.sams.service.impl;

import com.sams.dto.ModelDefectDTO;
import com.sams.entity.ModelDefect;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ModelDefectRepository;
import com.sams.service.ModelDefectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModelDefectServiceImpl implements ModelDefectService {

    private final ModelDefectRepository repository;

    @Override
    @Transactional
    public ModelDefectDTO create(ModelDefectDTO dto) {
        ModelDefect entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ModelDefectDTO getById(Long id) {
        ModelDefect entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelDefect not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ModelDefectDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ModelDefectDTO update(Long id, ModelDefectDTO dto) {
        ModelDefect entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelDefect not found with ID: " + id));
        ModelDefect mapped = mapToEntity(dto);
        mapped.setModelDefectId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ModelDefect entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModelDefect not found with ID: " + id));
        repository.delete(entity);
    }

    private ModelDefect mapToEntity(ModelDefectDTO dto) {
        ModelDefect entity = new ModelDefect();
        entity.setModelDefectId(dto.getModelDefectId());
        entity.setOrgId(dto.getOrgId());
        entity.setModelId(dto.getModelId());
        entity.setDefectName(dto.getDefectName());
        entity.setDefectTag(dto.getDefectTag());
        entity.setDefectCause(dto.getDefectCause());
        entity.setDefectSolution(dto.getDefectSolution());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ModelDefectDTO mapToDTO(ModelDefect entity) {
        ModelDefectDTO dto = new ModelDefectDTO();
        dto.setModelDefectId(entity.getModelDefectId());
        dto.setOrgId(entity.getOrgId());
        dto.setModelId(entity.getModelId());
        dto.setDefectName(entity.getDefectName());
        dto.setDefectTag(entity.getDefectTag());
        dto.setDefectCause(entity.getDefectCause());
        dto.setDefectSolution(entity.getDefectSolution());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}