package com.sams.service.impl;

import com.sams.dto.EmailTemplateConfigurationDTO;
import com.sams.entity.EmailTemplateConfiguration;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.EmailTemplateConfigurationRepository;
import com.sams.service.EmailTemplateConfigurationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmailTemplateConfigurationServiceImpl implements EmailTemplateConfigurationService {

    private final EmailTemplateConfigurationRepository repository;

    @Override
    @Transactional
    public EmailTemplateConfigurationDTO create(EmailTemplateConfigurationDTO dto) {
        EmailTemplateConfiguration entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public EmailTemplateConfigurationDTO getById(Long id) {
        EmailTemplateConfiguration entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailTemplateConfiguration not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<EmailTemplateConfigurationDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EmailTemplateConfigurationDTO update(Long id, EmailTemplateConfigurationDTO dto) {
        EmailTemplateConfiguration entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailTemplateConfiguration not found with ID: " + id));
        EmailTemplateConfiguration mapped = mapToEntity(dto);
        mapped.setEtcId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        EmailTemplateConfiguration entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailTemplateConfiguration not found with ID: " + id));
        repository.delete(entity);
    }

    private EmailTemplateConfiguration mapToEntity(EmailTemplateConfigurationDTO dto) {
        EmailTemplateConfiguration entity = new EmailTemplateConfiguration();
        entity.setEtcId(dto.getEtcId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setProcessId(dto.getProcessId());
        entity.setTriggerEvent(dto.getTriggerEvent());
        entity.setEmailTmplId(dto.getEmailTmplId());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private EmailTemplateConfigurationDTO mapToDTO(EmailTemplateConfiguration entity) {
        EmailTemplateConfigurationDTO dto = new EmailTemplateConfigurationDTO();
        dto.setEtcId(entity.getEtcId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setProcessId(entity.getProcessId());
        dto.setTriggerEvent(entity.getTriggerEvent());
        dto.setEmailTmplId(entity.getEmailTmplId());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}