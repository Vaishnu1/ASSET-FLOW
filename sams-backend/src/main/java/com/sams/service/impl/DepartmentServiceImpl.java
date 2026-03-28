package com.sams.service.impl;

import com.sams.dto.DepartmentDTO;
import com.sams.entity.Department;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.DepartmentRepository;
import com.sams.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Override
    @Transactional
    public DepartmentDTO createDepartment(DepartmentDTO dto) {
        if (departmentRepository.existsByDepartmentName(dto.getDepartmentName())) {
            throw new IllegalArgumentException("Department name already exists!");
        }
        Department department = mapToEntity(dto);
        Department savedDepartment = departmentRepository.save(department);
        return mapToDTO(savedDepartment);
    }

    @Override
    public DepartmentDTO getDepartmentById(Long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with ID: " + id));
        return mapToDTO(department);
    }

    @Override
    public List<DepartmentDTO> getAllDepartments() {
        return departmentRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public DepartmentDTO updateDepartment(Long id, DepartmentDTO dto) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with ID: " + id));
        
        if (!department.getDepartmentName().equals(dto.getDepartmentName()) && 
            departmentRepository.existsByDepartmentName(dto.getDepartmentName())) {
            throw new IllegalArgumentException("Department name already exists!");
        }

        department.setDepartmentName(dto.getDepartmentName());
        department.setDescription(dto.getDescription());
        if (dto.getActive() != null) {
            department.setActive(dto.getActive());
        }

        Department updatedDepartment = departmentRepository.save(department);
        return mapToDTO(updatedDepartment);
    }

    @Override
    @Transactional
    public void deleteDepartment(Long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with ID: " + id));
        departmentRepository.delete(department);
    }

    private Department mapToEntity(DepartmentDTO dto) {
        Department department = new Department();
        department.setDepartmentName(dto.getDepartmentName());
        department.setDescription(dto.getDescription());
        if (dto.getActive() != null) {
            department.setActive(dto.getActive());
        }
        return department;
    }

    private DepartmentDTO mapToDTO(Department entity) {
        DepartmentDTO dto = new DepartmentDTO();
        dto.setId(entity.getId());
        dto.setDepartmentName(entity.getDepartmentName());
        dto.setDescription(entity.getDescription());
        dto.setActive(entity.getActive());
        return dto;
    }
}
