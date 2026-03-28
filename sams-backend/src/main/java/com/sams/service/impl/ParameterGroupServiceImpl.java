package com.sams.service.impl;

import com.sams.dto.ParameterGroupDTO;
import com.sams.entity.ParameterGroup;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ParameterGroupRepository;
import com.sams.service.ParameterGroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ParameterGroupServiceImpl implements ParameterGroupService {

    private final ParameterGroupRepository repository;

    @Override
    @Transactional
    public ParameterGroupDTO createParameterGroup(ParameterGroupDTO dto) {
        ParameterGroup entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ParameterGroupDTO getParameterGroupById(Long id) {
        ParameterGroup entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ParameterGroup not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ParameterGroupDTO> getAllParameterGroups() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ParameterGroupDTO updateParameterGroup(Long id, ParameterGroupDTO dto) {
        ParameterGroup entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ParameterGroup not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        ParameterGroup mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteParameterGroup(Long id) {
        ParameterGroup entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ParameterGroup not found with ID: " + id));
        repository.delete(entity);
    }

    private ParameterGroup mapToEntity(ParameterGroupDTO dto) {
        ParameterGroup entity = new ParameterGroup();
        entity.setParameterGroupId(dto.getParameterGroupId());
        entity.setOrgId(dto.getOrgId());
        entity.setParameterGroupName(dto.getParameterGroupName());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setOrgName(dto.getOrgName());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        return entity;
    }

    private ParameterGroupDTO mapToDTO(ParameterGroup entity) {
        ParameterGroupDTO dto = new ParameterGroupDTO();
        dto.setId(entity.getId());
        dto.setParameterGroupId(entity.getParameterGroupId());
        dto.setOrgId(entity.getOrgId());
        dto.setParameterGroupName(entity.getParameterGroupName());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setOrgName(entity.getOrgName());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        return dto;
    }
}