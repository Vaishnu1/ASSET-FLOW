package com.sams.service.impl;

import com.sams.dto.EmployeeExperienceDTO;
import com.sams.entity.EmployeeExperience;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.EmployeeExperienceRepository;
import com.sams.service.EmployeeExperienceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeExperienceServiceImpl implements EmployeeExperienceService {

    private final EmployeeExperienceRepository repository;

    @Override
    @Transactional
    public EmployeeExperienceDTO create(EmployeeExperienceDTO dto) {
        EmployeeExperience entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public EmployeeExperienceDTO getById(Long id) {
        EmployeeExperience entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmployeeExperience not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<EmployeeExperienceDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EmployeeExperienceDTO update(Long id, EmployeeExperienceDTO dto) {
        EmployeeExperience entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmployeeExperience not found with ID: " + id));
        EmployeeExperience mapped = mapToEntity(dto);
        mapped.setEmployeeExperienceId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        EmployeeExperience entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmployeeExperience not found with ID: " + id));
        repository.delete(entity);
    }

    private EmployeeExperience mapToEntity(EmployeeExperienceDTO dto) {
        EmployeeExperience entity = new EmployeeExperience();
        entity.setEmployeeExperienceId(dto.getEmployeeExperienceId());
        entity.setEmployeeId(dto.getEmployeeId());
        entity.setCompanyName(dto.getCompanyName());
        entity.setAddress(dto.getAddress());
        entity.setStartDate(dto.getStartDate());
        entity.setEndDate(dto.getEndDate());
        entity.setDesignation(dto.getDesignation());
        entity.setSalaryDrawn(dto.getSalaryDrawn());
        entity.setReferenceDetails(dto.getReferenceDetails());
        entity.setDocumentSubmitted(dto.getDocumentSubmitted());
        entity.setDocumentInfo(dto.getDocumentInfo());
        entity.setExperienceNo(dto.getExperienceNo());
        entity.setQualificationNo(dto.getQualificationNo());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private EmployeeExperienceDTO mapToDTO(EmployeeExperience entity) {
        EmployeeExperienceDTO dto = new EmployeeExperienceDTO();
        dto.setEmployeeExperienceId(entity.getEmployeeExperienceId());
        dto.setEmployeeId(entity.getEmployeeId());
        dto.setCompanyName(entity.getCompanyName());
        dto.setAddress(entity.getAddress());
        dto.setStartDate(entity.getStartDate());
        dto.setEndDate(entity.getEndDate());
        dto.setDesignation(entity.getDesignation());
        dto.setSalaryDrawn(entity.getSalaryDrawn());
        dto.setReferenceDetails(entity.getReferenceDetails());
        dto.setDocumentSubmitted(entity.getDocumentSubmitted());
        dto.setDocumentInfo(entity.getDocumentInfo());
        dto.setExperienceNo(entity.getExperienceNo());
        dto.setQualificationNo(entity.getQualificationNo());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}