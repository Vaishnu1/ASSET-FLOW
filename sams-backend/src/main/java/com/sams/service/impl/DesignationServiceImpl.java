package com.sams.service.impl;

import com.sams.dto.DesignationDTO;
import com.sams.entity.Designation;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.DesignationRepository;
import com.sams.service.DesignationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DesignationServiceImpl implements DesignationService {

    private final DesignationRepository repository;

    @Override
    @Transactional
    public DesignationDTO createDesignation(DesignationDTO dto) {
        Designation entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public DesignationDTO getDesignationById(Long id) {
        Designation entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Designation not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<DesignationDTO> getAllDesignations() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public DesignationDTO updateDesignation(Long id, DesignationDTO dto) {
        Designation entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Designation not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        Designation mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteDesignation(Long id) {
        Designation entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Designation not found with ID: " + id));
        repository.delete(entity);
    }

    private Designation mapToEntity(DesignationDTO dto) {
        Designation entity = new Designation();
        entity.setDesignationId(dto.getDesignationId());
        entity.setLocationId(dto.getLocationId());
        entity.setDesignationName(dto.getDesignationName());
        entity.setDesignationDesc(dto.getDesignationDesc());
        entity.setActive(dto.getActive());
        entity.setActiveDisp(dto.getActiveDisp());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        return entity;
    }

    private DesignationDTO mapToDTO(Designation entity) {
        DesignationDTO dto = new DesignationDTO();
        dto.setId(entity.getId());
        dto.setDesignationId(entity.getDesignationId());
        dto.setLocationId(entity.getLocationId());
        dto.setDesignationName(entity.getDesignationName());
        dto.setDesignationDesc(entity.getDesignationDesc());
        dto.setActive(entity.getActive());
        dto.setActiveDisp(entity.getActiveDisp());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        return dto;
    }
}