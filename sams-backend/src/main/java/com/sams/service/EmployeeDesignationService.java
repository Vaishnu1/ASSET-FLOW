package com.sams.service;

import com.sams.dto.EmployeeDesignationDTO;
import java.util.List;

public interface EmployeeDesignationService {
    EmployeeDesignationDTO createEmployeeDesignation(EmployeeDesignationDTO dto);
    EmployeeDesignationDTO getEmployeeDesignationById(Long id);
    List<EmployeeDesignationDTO> getAllEmployeeDesignations();
    EmployeeDesignationDTO updateEmployeeDesignation(Long id, EmployeeDesignationDTO dto);
    void deleteEmployeeDesignation(Long id);
}