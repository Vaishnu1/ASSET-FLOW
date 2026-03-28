package com.sams.service.impl;

import com.sams.dto.WorkFlowProcessStatusDTO;
import com.sams.entity.WorkFlowProcessStatus;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.WorkFlowProcessStatusRepository;
import com.sams.service.WorkFlowProcessStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkFlowProcessStatusServiceImpl implements WorkFlowProcessStatusService {

    private final WorkFlowProcessStatusRepository repository;

    @Override
    @Transactional
    public WorkFlowProcessStatusDTO create(WorkFlowProcessStatusDTO dto) {
        WorkFlowProcessStatus entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public WorkFlowProcessStatusDTO getById(Long id) {
        WorkFlowProcessStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WorkFlowProcessStatus not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<WorkFlowProcessStatusDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public WorkFlowProcessStatusDTO update(Long id, WorkFlowProcessStatusDTO dto) {
        WorkFlowProcessStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WorkFlowProcessStatus not found with ID: " + id));
        WorkFlowProcessStatus mapped = mapToEntity(dto);
        mapped.setWorkFlowProcessId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        WorkFlowProcessStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WorkFlowProcessStatus not found with ID: " + id));
        repository.delete(entity);
    }

    private WorkFlowProcessStatus mapToEntity(WorkFlowProcessStatusDTO dto) {
        WorkFlowProcessStatus entity = new WorkFlowProcessStatus();
        entity.setWorkFlowProcessId(dto.getWorkFlowProcessId());
        entity.setProcessStatusName(dto.getProcessStatusName());
        entity.setProcessId(dto.getProcessId());
        entity.setOrgId(dto.getOrgId());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private WorkFlowProcessStatusDTO mapToDTO(WorkFlowProcessStatus entity) {
        WorkFlowProcessStatusDTO dto = new WorkFlowProcessStatusDTO();
        dto.setWorkFlowProcessId(entity.getWorkFlowProcessId());
        dto.setProcessStatusName(entity.getProcessStatusName());
        dto.setProcessId(entity.getProcessId());
        dto.setOrgId(entity.getOrgId());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}