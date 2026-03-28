package com.sams.service.impl;

import com.sams.dto.subDepartmentDTO;
import com.sams.entity.subDepartment;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.subDepartmentRepository;
import com.sams.service.subDepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class subDepartmentServiceImpl implements subDepartmentService {

    private final subDepartmentRepository repository;

    @Override
    @Transactional
    public subDepartmentDTO createsubDepartment(subDepartmentDTO dto) {
        subDepartment entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public subDepartmentDTO getsubDepartmentById(Long id) {
        subDepartment entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("subDepartment not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<subDepartmentDTO> getAllsubDepartments() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public subDepartmentDTO updatesubDepartment(Long id, subDepartmentDTO dto) {
        subDepartment entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("subDepartment not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        subDepartment mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deletesubDepartment(Long id) {
        subDepartment entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("subDepartment not found with ID: " + id));
        repository.delete(entity);
    }

    private subDepartment mapToEntity(subDepartmentDTO dto) {
        subDepartment entity = new subDepartment();
        entity.setDepartmentId(dto.getDepartmentId());
        entity.setDepartmentName(dto.getDepartmentName());
        entity.setSubDepartmentId(dto.getSubDepartmentId());
        entity.setSubDepartmentName(dto.getSubDepartmentName());
        entity.setEmployeeId(dto.getEmployeeId());
        entity.setSubDepEmployeeName(dto.getSubDepEmployeeName());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setLogInUserOrgId(dto.getLogInUserOrgId());
        entity.setLogInUserLocId(dto.getLogInUserLocId());
        entity.setLogInUserId(dto.getLogInUserId());
        entity.setSubDepEmailId(dto.getSubDepEmailId());
        entity.setSubDepContactNo(dto.getSubDepContactNo());
        entity.setOrgId(dto.getOrgId());
        entity.setOrgName(dto.getOrgName());
        entity.setSubDepartmentCode(dto.getSubDepartmentCode());
        return entity;
    }

    private subDepartmentDTO mapToDTO(subDepartment entity) {
        subDepartmentDTO dto = new subDepartmentDTO();
        dto.setId(entity.getId());
        dto.setDepartmentId(entity.getDepartmentId());
        dto.setDepartmentName(entity.getDepartmentName());
        dto.setSubDepartmentId(entity.getSubDepartmentId());
        dto.setSubDepartmentName(entity.getSubDepartmentName());
        dto.setEmployeeId(entity.getEmployeeId());
        dto.setSubDepEmployeeName(entity.getSubDepEmployeeName());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setLogInUserOrgId(entity.getLogInUserOrgId());
        dto.setLogInUserLocId(entity.getLogInUserLocId());
        dto.setLogInUserId(entity.getLogInUserId());
        dto.setSubDepEmailId(entity.getSubDepEmailId());
        dto.setSubDepContactNo(entity.getSubDepContactNo());
        dto.setOrgId(entity.getOrgId());
        dto.setOrgName(entity.getOrgName());
        dto.setSubDepartmentCode(entity.getSubDepartmentCode());
        return dto;
    }
}