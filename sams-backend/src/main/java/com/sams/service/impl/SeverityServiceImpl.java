package com.sams.service.impl;

import com.sams.dto.SeverityDTO;
import com.sams.entity.Severity;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SeverityRepository;
import com.sams.service.SeverityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SeverityServiceImpl implements SeverityService {

    private final SeverityRepository repository;

    @Override
    @Transactional
    public SeverityDTO createSeverity(SeverityDTO dto) {
        Severity entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SeverityDTO getSeverityById(Long id) {
        Severity entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Severity not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SeverityDTO> getAllSeverities() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SeverityDTO updateSeverity(Long id, SeverityDTO dto) {
        Severity entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Severity not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        Severity mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteSeverity(Long id) {
        Severity entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Severity not found with ID: " + id));
        repository.delete(entity);
    }

    private Severity mapToEntity(SeverityDTO dto) {
        Severity entity = new Severity();
        entity.setSeverityId(dto.getSeverityId());
        entity.setOrgId(dto.getOrgId());
        entity.setSeverityName(dto.getSeverityName());
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

    private SeverityDTO mapToDTO(Severity entity) {
        SeverityDTO dto = new SeverityDTO();
        dto.setId(entity.getId());
        dto.setSeverityId(entity.getSeverityId());
        dto.setOrgId(entity.getOrgId());
        dto.setSeverityName(entity.getSeverityName());
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