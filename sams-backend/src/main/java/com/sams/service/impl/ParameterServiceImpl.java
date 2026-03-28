package com.sams.service.impl;

import com.sams.dto.ParameterDTO;
import com.sams.entity.Parameter;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ParameterRepository;
import com.sams.service.ParameterService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ParameterServiceImpl implements ParameterService {

    private final ParameterRepository repository;

    @Override
    @Transactional
    public ParameterDTO createParameter(ParameterDTO dto) {
        Parameter entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ParameterDTO getParameterById(Long id) {
        Parameter entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Parameter not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ParameterDTO> getAllParameters() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ParameterDTO updateParameter(Long id, ParameterDTO dto) {
        Parameter entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Parameter not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        Parameter mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteParameter(Long id) {
        Parameter entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Parameter not found with ID: " + id));
        repository.delete(entity);
    }

    private Parameter mapToEntity(ParameterDTO dto) {
        Parameter entity = new Parameter();
        entity.setParameterId(dto.getParameterId());
        entity.setOrgId(dto.getOrgId());
        entity.setParameterName(dto.getParameterName());
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

    private ParameterDTO mapToDTO(Parameter entity) {
        ParameterDTO dto = new ParameterDTO();
        dto.setId(entity.getId());
        dto.setParameterId(entity.getParameterId());
        dto.setOrgId(entity.getOrgId());
        dto.setParameterName(entity.getParameterName());
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