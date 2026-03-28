package com.sams.service;

import com.sams.dto.EmployeeExperienceDTO;
import java.util.List;

public interface EmployeeExperienceService {
    EmployeeExperienceDTO create(EmployeeExperienceDTO dto);
    EmployeeExperienceDTO getById(Long id);
    List<EmployeeExperienceDTO> getAll();
    EmployeeExperienceDTO update(Long id, EmployeeExperienceDTO dto);
    void delete(Long id);
}