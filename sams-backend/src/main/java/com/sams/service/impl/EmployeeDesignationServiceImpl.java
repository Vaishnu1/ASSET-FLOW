package com.sams.service.impl;

import com.sams.dto.EmployeeDesignationDTO;
import com.sams.entity.EmployeeDesignation;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.EmployeeDesignationRepository;
import com.sams.service.EmployeeDesignationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeDesignationServiceImpl implements EmployeeDesignationService {

    private final EmployeeDesignationRepository repository;

    @Override
    @Transactional
    public EmployeeDesignationDTO createEmployeeDesignation(EmployeeDesignationDTO dto) {
        EmployeeDesignation entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public EmployeeDesignationDTO getEmployeeDesignationById(Long id) {
        EmployeeDesignation entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmployeeDesignation not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<EmployeeDesignationDTO> getAllEmployeeDesignations() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EmployeeDesignationDTO updateEmployeeDesignation(Long id, EmployeeDesignationDTO dto) {
        EmployeeDesignation entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmployeeDesignation not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        EmployeeDesignation mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteEmployeeDesignation(Long id) {
        EmployeeDesignation entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmployeeDesignation not found with ID: " + id));
        repository.delete(entity);
    }

    private EmployeeDesignation mapToEntity(EmployeeDesignationDTO dto) {
        EmployeeDesignation entity = new EmployeeDesignation();
        entity.setEmployeeDesignationId(dto.getEmployeeDesignationId());
        entity.setEmployeeId(dto.getEmployeeId());
        entity.setDesignationId(dto.getDesignationId());
        entity.setDesignationName(dto.getDesignationName());
        entity.setDesignationfromDate(dto.getDesignationfromDate());
        entity.setDesignationtillDate(dto.getDesignationtillDate());
        entity.setReportingPersonId(dto.getReportingPersonId());
        entity.setReportingPersonName(dto.getReportingPersonName());
        entity.setStatus(dto.getStatus());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        return entity;
    }

    private EmployeeDesignationDTO mapToDTO(EmployeeDesignation entity) {
        EmployeeDesignationDTO dto = new EmployeeDesignationDTO();
        dto.setId(entity.getId());
        dto.setEmployeeDesignationId(entity.getEmployeeDesignationId());
        dto.setEmployeeId(entity.getEmployeeId());
        dto.setDesignationId(entity.getDesignationId());
        dto.setDesignationName(entity.getDesignationName());
        dto.setDesignationfromDate(entity.getDesignationfromDate());
        dto.setDesignationtillDate(entity.getDesignationtillDate());
        dto.setReportingPersonId(entity.getReportingPersonId());
        dto.setReportingPersonName(entity.getReportingPersonName());
        dto.setStatus(entity.getStatus());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        return dto;
    }
}