package com.sams.service.impl;

import com.sams.dto.EmailProcessesDTO;
import com.sams.entity.EmailProcesses;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.EmailProcessesRepository;
import com.sams.service.EmailProcessesService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmailProcessesServiceImpl implements EmailProcessesService {

    private final EmailProcessesRepository repository;

    @Override
    @Transactional
    public EmailProcessesDTO create(EmailProcessesDTO dto) {
        EmailProcesses entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public EmailProcessesDTO getById(Long id) {
        EmailProcesses entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailProcesses not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<EmailProcessesDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EmailProcessesDTO update(Long id, EmailProcessesDTO dto) {
        EmailProcesses entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailProcesses not found with ID: " + id));
        EmailProcesses mapped = mapToEntity(dto);
        mapped.setProcessId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        EmailProcesses entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailProcesses not found with ID: " + id));
        repository.delete(entity);
    }

    private EmailProcesses mapToEntity(EmailProcessesDTO dto) {
        EmailProcesses entity = new EmailProcesses();
        entity.setProcessId(dto.getProcessId());
        entity.setProcessName(dto.getProcessName());
        entity.setModuleId(dto.getModuleId());
        entity.setActive(dto.getActive());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private EmailProcessesDTO mapToDTO(EmailProcesses entity) {
        EmailProcessesDTO dto = new EmailProcessesDTO();
        dto.setProcessId(entity.getProcessId());
        dto.setProcessName(entity.getProcessName());
        dto.setModuleId(entity.getModuleId());
        dto.setActive(entity.getActive());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}