package com.sams.service.impl;

import com.sams.dto.EmailModulesDTO;
import com.sams.entity.EmailModules;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.EmailModulesRepository;
import com.sams.service.EmailModulesService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmailModulesServiceImpl implements EmailModulesService {

    private final EmailModulesRepository repository;

    @Override
    @Transactional
    public EmailModulesDTO create(EmailModulesDTO dto) {
        EmailModules entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public EmailModulesDTO getById(Long id) {
        EmailModules entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailModules not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<EmailModulesDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EmailModulesDTO update(Long id, EmailModulesDTO dto) {
        EmailModules entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailModules not found with ID: " + id));
        EmailModules mapped = mapToEntity(dto);
        mapped.setModuleId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        EmailModules entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailModules not found with ID: " + id));
        repository.delete(entity);
    }

    private EmailModules mapToEntity(EmailModulesDTO dto) {
        EmailModules entity = new EmailModules();
        entity.setModuleId(dto.getModuleId());
        entity.setModuleName(dto.getModuleName());
        entity.setActive(dto.getActive());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private EmailModulesDTO mapToDTO(EmailModules entity) {
        EmailModulesDTO dto = new EmailModulesDTO();
        dto.setModuleId(entity.getModuleId());
        dto.setModuleName(entity.getModuleName());
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