package com.sams.service;

import com.sams.dto.EmployeeQualificationDTO;
import java.util.List;

public interface EmployeeQualificationService {
    EmployeeQualificationDTO create(EmployeeQualificationDTO dto);
    EmployeeQualificationDTO getById(Long id);
    List<EmployeeQualificationDTO> getAll();
    EmployeeQualificationDTO update(Long id, EmployeeQualificationDTO dto);
    void delete(Long id);
}