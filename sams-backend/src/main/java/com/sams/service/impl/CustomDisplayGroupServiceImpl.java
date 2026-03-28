package com.sams.service.impl;

import com.sams.dto.CustomDisplayGroupDTO;
import com.sams.entity.CustomDisplayGroup;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.CustomDisplayGroupRepository;
import com.sams.service.CustomDisplayGroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomDisplayGroupServiceImpl implements CustomDisplayGroupService {

    private final CustomDisplayGroupRepository repository;

    @Override
    @Transactional
    public CustomDisplayGroupDTO create(CustomDisplayGroupDTO dto) {
        CustomDisplayGroup entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public CustomDisplayGroupDTO getById(Long id) {
        CustomDisplayGroup entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CustomDisplayGroup not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<CustomDisplayGroupDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CustomDisplayGroupDTO update(Long id, CustomDisplayGroupDTO dto) {
        CustomDisplayGroup entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CustomDisplayGroup not found with ID: " + id));
        CustomDisplayGroup mapped = mapToEntity(dto);
        mapped.setCustomDisplayGroupId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        CustomDisplayGroup entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CustomDisplayGroup not found with ID: " + id));
        repository.delete(entity);
    }

    private CustomDisplayGroup mapToEntity(CustomDisplayGroupDTO dto) {
        CustomDisplayGroup entity = new CustomDisplayGroup();
        entity.setCustomDisplayGroupId(dto.getCustomDisplayGroupId());
        entity.setOrgId(dto.getOrgId());
        entity.setDisplayGroup(dto.getDisplayGroup());
        entity.setColor(dto.getColor());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private CustomDisplayGroupDTO mapToDTO(CustomDisplayGroup entity) {
        CustomDisplayGroupDTO dto = new CustomDisplayGroupDTO();
        dto.setCustomDisplayGroupId(entity.getCustomDisplayGroupId());
        dto.setOrgId(entity.getOrgId());
        dto.setDisplayGroup(entity.getDisplayGroup());
        dto.setColor(entity.getColor());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}