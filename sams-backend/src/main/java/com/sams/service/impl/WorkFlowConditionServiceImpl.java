package com.sams.service.impl;

import com.sams.dto.WorkFlowConditionDTO;
import com.sams.entity.WorkFlowCondition;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.WorkFlowConditionRepository;
import com.sams.service.WorkFlowConditionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkFlowConditionServiceImpl implements WorkFlowConditionService {

    private final WorkFlowConditionRepository repository;

    @Override
    @Transactional
    public WorkFlowConditionDTO create(WorkFlowConditionDTO dto) {
        WorkFlowCondition entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public WorkFlowConditionDTO getById(Long id) {
        WorkFlowCondition entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WorkFlowCondition not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<WorkFlowConditionDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public WorkFlowConditionDTO update(Long id, WorkFlowConditionDTO dto) {
        WorkFlowCondition entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WorkFlowCondition not found with ID: " + id));
        WorkFlowCondition mapped = mapToEntity(dto);
        mapped.setConditionId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        WorkFlowCondition entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WorkFlowCondition not found with ID: " + id));
        repository.delete(entity);
    }

    private WorkFlowCondition mapToEntity(WorkFlowConditionDTO dto) {
        WorkFlowCondition entity = new WorkFlowCondition();
        entity.setConditionId(dto.getConditionId());
        entity.setOrgId(dto.getOrgId());
        entity.setConditionName(dto.getConditionName());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private WorkFlowConditionDTO mapToDTO(WorkFlowCondition entity) {
        WorkFlowConditionDTO dto = new WorkFlowConditionDTO();
        dto.setConditionId(entity.getConditionId());
        dto.setOrgId(entity.getOrgId());
        dto.setConditionName(entity.getConditionName());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}