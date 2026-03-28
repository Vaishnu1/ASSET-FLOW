package com.sams.service;

import com.sams.dto.EmployeeSkillDTO;
import java.util.List;

public interface EmployeeSkillService {
    EmployeeSkillDTO create(EmployeeSkillDTO dto);
    EmployeeSkillDTO getById(Long id);
    List<EmployeeSkillDTO> getAll();
    EmployeeSkillDTO update(Long id, EmployeeSkillDTO dto);
    void delete(Long id);
}