package com.sams.service.impl;

import com.sams.dto.departmentDtlDTO;
import com.sams.entity.departmentDtl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.departmentDtlRepository;
import com.sams.service.departmentDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class departmentDtlServiceImpl implements departmentDtlService {

    private final departmentDtlRepository repository;

    @Override
    @Transactional
    public departmentDtlDTO createdepartmentDtl(departmentDtlDTO dto) {
        departmentDtl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public departmentDtlDTO getdepartmentDtlById(Long id) {
        departmentDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("departmentDtl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<departmentDtlDTO> getAlldepartmentDtls() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public departmentDtlDTO updatedepartmentDtl(Long id, departmentDtlDTO dto) {
        departmentDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("departmentDtl not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        departmentDtl mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deletedepartmentDtl(Long id) {
        departmentDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("departmentDtl not found with ID: " + id));
        repository.delete(entity);
    }

    private departmentDtl mapToEntity(departmentDtlDTO dto) {
        departmentDtl entity = new departmentDtl();
        entity.setDepartFacultyId(dto.getDepartFacultyId());
        entity.setDepartmentId(dto.getDepartmentId());
        entity.setDepartmentName(dto.getDepartmentName());
        entity.setEmployeeId(dto.getEmployeeId());
        entity.setEmployeeName(dto.getEmployeeName());
        entity.setFacultyContactNo(dto.getFacultyContactNo());
        entity.setFacultyEmailId(dto.getFacultyEmailId());
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

    private departmentDtlDTO mapToDTO(departmentDtl entity) {
        departmentDtlDTO dto = new departmentDtlDTO();
        dto.setId(entity.getId());
        dto.setDepartFacultyId(entity.getDepartFacultyId());
        dto.setDepartmentId(entity.getDepartmentId());
        dto.setDepartmentName(entity.getDepartmentName());
        dto.setEmployeeId(entity.getEmployeeId());
        dto.setEmployeeName(entity.getEmployeeName());
        dto.setFacultyContactNo(entity.getFacultyContactNo());
        dto.setFacultyEmailId(entity.getFacultyEmailId());
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