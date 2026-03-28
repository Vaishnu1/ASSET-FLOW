package com.sams.service.impl;

import com.sams.dto.EmployeeQualificationDTO;
import com.sams.entity.EmployeeQualification;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.EmployeeQualificationRepository;
import com.sams.service.EmployeeQualificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeQualificationServiceImpl implements EmployeeQualificationService {

    private final EmployeeQualificationRepository repository;

    @Override
    @Transactional
    public EmployeeQualificationDTO create(EmployeeQualificationDTO dto) {
        EmployeeQualification entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public EmployeeQualificationDTO getById(Long id) {
        EmployeeQualification entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmployeeQualification not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<EmployeeQualificationDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EmployeeQualificationDTO update(Long id, EmployeeQualificationDTO dto) {
        EmployeeQualification entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmployeeQualification not found with ID: " + id));
        EmployeeQualification mapped = mapToEntity(dto);
        mapped.setEmployeeQualificationId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        EmployeeQualification entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmployeeQualification not found with ID: " + id));
        repository.delete(entity);
    }

    private EmployeeQualification mapToEntity(EmployeeQualificationDTO dto) {
        EmployeeQualification entity = new EmployeeQualification();
        entity.setEmployeeQualificationId(dto.getEmployeeQualificationId());
        entity.setEmployeeId(dto.getEmployeeId());
        entity.setQualificationNo(dto.getQualificationNo());
        entity.setQualificationName(dto.getQualificationName());
        entity.setUniversity(dto.getUniversity());
        entity.setBoard(dto.getBoard());
        entity.setStartDate(dto.getStartDate());
        entity.setCompletedDate(dto.getCompletedDate());
        entity.setYearOfPassing(dto.getYearOfPassing());
        entity.setPercentage(dto.getPercentage());
        entity.setDocumentSubmitted(dto.getDocumentSubmitted());
        entity.setDocumentInfo(dto.getDocumentInfo());
        entity.setStatus(dto.getStatus());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private EmployeeQualificationDTO mapToDTO(EmployeeQualification entity) {
        EmployeeQualificationDTO dto = new EmployeeQualificationDTO();
        dto.setEmployeeQualificationId(entity.getEmployeeQualificationId());
        dto.setEmployeeId(entity.getEmployeeId());
        dto.setQualificationNo(entity.getQualificationNo());
        dto.setQualificationName(entity.getQualificationName());
        dto.setUniversity(entity.getUniversity());
        dto.setBoard(entity.getBoard());
        dto.setStartDate(entity.getStartDate());
        dto.setCompletedDate(entity.getCompletedDate());
        dto.setYearOfPassing(entity.getYearOfPassing());
        dto.setPercentage(entity.getPercentage());
        dto.setDocumentSubmitted(entity.getDocumentSubmitted());
        dto.setDocumentInfo(entity.getDocumentInfo());
        dto.setStatus(entity.getStatus());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}