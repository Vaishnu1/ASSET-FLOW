package com.sams.service.impl;

import com.sams.dto.WorkFlowProcessDTO;
import com.sams.entity.WorkFlowProcess;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.WorkFlowProcessRepository;
import com.sams.service.WorkFlowProcessService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkFlowProcessServiceImpl implements WorkFlowProcessService {

    private final WorkFlowProcessRepository repository;

    @Override
    @Transactional
    public WorkFlowProcessDTO create(WorkFlowProcessDTO dto) {
        WorkFlowProcess entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public WorkFlowProcessDTO getById(Long id) {
        WorkFlowProcess entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WorkFlowProcess not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<WorkFlowProcessDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public WorkFlowProcessDTO update(Long id, WorkFlowProcessDTO dto) {
        WorkFlowProcess entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WorkFlowProcess not found with ID: " + id));
        WorkFlowProcess mapped = mapToEntity(dto);
        mapped.setProcessId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        WorkFlowProcess entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WorkFlowProcess not found with ID: " + id));
        repository.delete(entity);
    }

    private WorkFlowProcess mapToEntity(WorkFlowProcessDTO dto) {
        WorkFlowProcess entity = new WorkFlowProcess();
        entity.setProcessId(dto.getProcessId());
        entity.setProcessName(dto.getProcessName());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private WorkFlowProcessDTO mapToDTO(WorkFlowProcess entity) {
        WorkFlowProcessDTO dto = new WorkFlowProcessDTO();
        dto.setProcessId(entity.getProcessId());
        dto.setProcessName(entity.getProcessName());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}