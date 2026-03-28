package com.sams.service.impl;

import com.sams.dto.ParameterTypeDTO;
import com.sams.entity.ParameterType;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ParameterTypeRepository;
import com.sams.service.ParameterTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ParameterTypeServiceImpl implements ParameterTypeService {

    private final ParameterTypeRepository repository;

    @Override
    @Transactional
    public ParameterTypeDTO createParameterType(ParameterTypeDTO dto) {
        ParameterType entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ParameterTypeDTO getParameterTypeById(Long id) {
        ParameterType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ParameterType not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ParameterTypeDTO> getAllParameterTypes() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ParameterTypeDTO updateParameterType(Long id, ParameterTypeDTO dto) {
        ParameterType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ParameterType not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        ParameterType mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteParameterType(Long id) {
        ParameterType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ParameterType not found with ID: " + id));
        repository.delete(entity);
    }

    private ParameterType mapToEntity(ParameterTypeDTO dto) {
        ParameterType entity = new ParameterType();
        entity.setParameterTypeId(dto.getParameterTypeId());
        entity.setOrgId(dto.getOrgId());
        entity.setParameterTypeName(dto.getParameterTypeName());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setOrgName(dto.getOrgName());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setParameterTypeNameDisp(dto.getParameterTypeNameDisp());
        return entity;
    }

    private ParameterTypeDTO mapToDTO(ParameterType entity) {
        ParameterTypeDTO dto = new ParameterTypeDTO();
        dto.setId(entity.getId());
        dto.setParameterTypeId(entity.getParameterTypeId());
        dto.setOrgId(entity.getOrgId());
        dto.setParameterTypeName(entity.getParameterTypeName());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setOrgName(entity.getOrgName());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setParameterTypeNameDisp(entity.getParameterTypeNameDisp());
        return dto;
    }
}