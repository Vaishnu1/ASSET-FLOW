package com.sams.service.impl;

import com.sams.dto.WorkFlowDescriptionDTO;
import com.sams.entity.WorkFlowDescription;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.WorkFlowDescriptionRepository;
import com.sams.service.WorkFlowDescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkFlowDescriptionServiceImpl implements WorkFlowDescriptionService {

    private final WorkFlowDescriptionRepository repository;

    @Override
    @Transactional
    public WorkFlowDescriptionDTO create(WorkFlowDescriptionDTO dto) {
        WorkFlowDescription entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public WorkFlowDescriptionDTO getById(Long id) {
        WorkFlowDescription entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WorkFlowDescription not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<WorkFlowDescriptionDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public WorkFlowDescriptionDTO update(Long id, WorkFlowDescriptionDTO dto) {
        WorkFlowDescription entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WorkFlowDescription not found with ID: " + id));
        WorkFlowDescription mapped = mapToEntity(dto);
        mapped.setWorkFlowDescId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        WorkFlowDescription entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WorkFlowDescription not found with ID: " + id));
        repository.delete(entity);
    }

    private WorkFlowDescription mapToEntity(WorkFlowDescriptionDTO dto) {
        WorkFlowDescription entity = new WorkFlowDescription();
        entity.setWorkFlowDescId(dto.getWorkFlowDescId());
        entity.setOrgId(dto.getOrgId());
        entity.setWorkFlowName(dto.getWorkFlowName());
        entity.setProcessId(dto.getProcessId());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private WorkFlowDescriptionDTO mapToDTO(WorkFlowDescription entity) {
        WorkFlowDescriptionDTO dto = new WorkFlowDescriptionDTO();
        dto.setWorkFlowDescId(entity.getWorkFlowDescId());
        dto.setOrgId(entity.getOrgId());
        dto.setWorkFlowName(entity.getWorkFlowName());
        dto.setProcessId(entity.getProcessId());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}