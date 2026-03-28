package com.sams.service.impl;

import com.sams.dto.EmailVariableConfigDTO;
import com.sams.entity.EmailVariableConfig;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.EmailVariableConfigRepository;
import com.sams.service.EmailVariableConfigService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmailVariableConfigServiceImpl implements EmailVariableConfigService {

    private final EmailVariableConfigRepository repository;

    @Override
    @Transactional
    public EmailVariableConfigDTO create(EmailVariableConfigDTO dto) {
        EmailVariableConfig entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public EmailVariableConfigDTO getById(Long id) {
        EmailVariableConfig entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailVariableConfig not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<EmailVariableConfigDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EmailVariableConfigDTO update(Long id, EmailVariableConfigDTO dto) {
        EmailVariableConfig entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailVariableConfig not found with ID: " + id));
        EmailVariableConfig mapped = mapToEntity(dto);
        mapped.setId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        EmailVariableConfig entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailVariableConfig not found with ID: " + id));
        repository.delete(entity);
    }

    private EmailVariableConfig mapToEntity(EmailVariableConfigDTO dto) {
        EmailVariableConfig entity = new EmailVariableConfig();
        entity.setId(dto.getId());
        entity.setProcessName(dto.getProcessName());
        entity.setTriggerEvent(dto.getTriggerEvent());
        entity.setVariable1(dto.getVariable1());
        entity.setVariable2(dto.getVariable2());
        entity.setVariable3(dto.getVariable3());
        entity.setVariable4(dto.getVariable4());
        entity.setVariable5(dto.getVariable5());
        entity.setVariable6(dto.getVariable6());
        entity.setVariable7(dto.getVariable7());
        entity.setVariable8(dto.getVariable8());
        entity.setVariable9(dto.getVariable9());
        entity.setVariable10(dto.getVariable10());
        entity.setIsActive(dto.getIsActive());
        entity.setCreatedAt(dto.getCreatedAt());
        return entity;
    }

    private EmailVariableConfigDTO mapToDTO(EmailVariableConfig entity) {
        EmailVariableConfigDTO dto = new EmailVariableConfigDTO();
        dto.setId(entity.getId());
        dto.setProcessName(entity.getProcessName());
        dto.setTriggerEvent(entity.getTriggerEvent());
        dto.setVariable1(entity.getVariable1());
        dto.setVariable2(entity.getVariable2());
        dto.setVariable3(entity.getVariable3());
        dto.setVariable4(entity.getVariable4());
        dto.setVariable5(entity.getVariable5());
        dto.setVariable6(entity.getVariable6());
        dto.setVariable7(entity.getVariable7());
        dto.setVariable8(entity.getVariable8());
        dto.setVariable9(entity.getVariable9());
        dto.setVariable10(entity.getVariable10());
        dto.setIsActive(entity.getIsActive());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }
}