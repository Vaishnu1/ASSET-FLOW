package com.sams.service.impl;

import com.sams.dto.ProcessStatusDTO;
import com.sams.entity.ProcessStatus;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ProcessStatusRepository;
import com.sams.service.ProcessStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProcessStatusServiceImpl implements ProcessStatusService {

    private final ProcessStatusRepository repository;

    @Override
    @Transactional
    public ProcessStatusDTO create(ProcessStatusDTO dto) {
        ProcessStatus entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ProcessStatusDTO getById(Long id) {
        ProcessStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ProcessStatus not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ProcessStatusDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ProcessStatusDTO update(Long id, ProcessStatusDTO dto) {
        ProcessStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ProcessStatus not found with ID: " + id));
        ProcessStatus mapped = mapToEntity(dto);
        mapped.setProcessStatusId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ProcessStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ProcessStatus not found with ID: " + id));
        repository.delete(entity);
    }

    private ProcessStatus mapToEntity(ProcessStatusDTO dto) {
        ProcessStatus entity = new ProcessStatus();
        entity.setProcessStatusId(dto.getProcessStatusId());
        entity.setProcessStatusName(dto.getProcessStatusName());
        entity.setProcessId(dto.getProcessId());
        entity.setProcessName(dto.getProcessName());
        entity.setSeqProcessStatusId(dto.getSeqProcessStatusId());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ProcessStatusDTO mapToDTO(ProcessStatus entity) {
        ProcessStatusDTO dto = new ProcessStatusDTO();
        dto.setProcessStatusId(entity.getProcessStatusId());
        dto.setProcessStatusName(entity.getProcessStatusName());
        dto.setProcessId(entity.getProcessId());
        dto.setProcessName(entity.getProcessName());
        dto.setSeqProcessStatusId(entity.getSeqProcessStatusId());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}