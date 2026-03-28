package com.sams.service;

import com.sams.dto.subDepartmentDTO;
import java.util.List;

public interface subDepartmentService {
    subDepartmentDTO createsubDepartment(subDepartmentDTO dto);
    subDepartmentDTO getsubDepartmentById(Long id);
    List<subDepartmentDTO> getAllsubDepartments();
    subDepartmentDTO updatesubDepartment(Long id, subDepartmentDTO dto);
    void deletesubDepartment(Long id);
}