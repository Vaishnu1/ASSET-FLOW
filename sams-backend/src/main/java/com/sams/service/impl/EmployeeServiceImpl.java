package com.sams.service.impl;

import com.sams.dto.EmployeeDTO;
import com.sams.entity.Department;
import com.sams.entity.Employee;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.DepartmentRepository;
import com.sams.repository.EmployeeRepository;
import com.sams.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    @Override
    @Transactional
    public EmployeeDTO createEmployee(EmployeeDTO dto) {
        if (dto.getEmail() != null && employeeRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Employee email already exists!");
        }

        Employee employee = mapToEntity(dto);
        Employee savedEmployee = employeeRepository.save(employee);
        return mapToDTO(savedEmployee);
    }

    @Override
    public EmployeeDTO getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + id));
        return mapToDTO(employee);
    }

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EmployeeDTO updateEmployee(Long id, EmployeeDTO dto) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + id));

        if (dto.getEmail() != null && !dto.getEmail().equals(employee.getEmail()) &&
                employeeRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Employee email already exists!");
        }

        employee.setFirstName(dto.getFirstName());
        employee.setLastName(dto.getLastName());
        employee.setEmail(dto.getEmail());
        employee.setPhoneNumber(dto.getPhoneNumber());
        employee.setDesignation(dto.getDesignation());
        if (dto.getActive() != null) {
            employee.setActive(dto.getActive());
        }

        if (dto.getDepartmentId() != null) {
            Department department = departmentRepository.findById(dto.getDepartmentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Department not found with ID: " + dto.getDepartmentId()));
            employee.setDepartment(department);
        } else {
            employee.setDepartment(null);
        }

        Employee updatedEmployee = employeeRepository.save(employee);
        return mapToDTO(updatedEmployee);
    }

    @Override
    @Transactional
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + id));
        employeeRepository.delete(employee);
    }

    private Employee mapToEntity(EmployeeDTO dto) {
        Employee employee = new Employee();
        employee.setFirstName(dto.getFirstName());
        employee.setLastName(dto.getLastName());
        employee.setEmail(dto.getEmail());
        employee.setPhoneNumber(dto.getPhoneNumber());
        employee.setDesignation(dto.getDesignation());
        if (dto.getActive() != null) {
            employee.setActive(dto.getActive());
        }
        
        if (dto.getDepartmentId() != null) {
            Department department = departmentRepository.findById(dto.getDepartmentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Department not found with ID: " + dto.getDepartmentId()));
            employee.setDepartment(department);
        }
        return employee;
    }

    private EmployeeDTO mapToDTO(Employee entity) {
        EmployeeDTO dto = new EmployeeDTO();
        dto.setId(entity.getId());
        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.setEmail(entity.getEmail());
        dto.setPhoneNumber(entity.getPhoneNumber());
        dto.setDesignation(entity.getDesignation());
        dto.setActive(entity.getActive());
        
        if (entity.getDepartment() != null) {
            dto.setDepartmentId(entity.getDepartment().getId());
        }
        return dto;
    }
}
