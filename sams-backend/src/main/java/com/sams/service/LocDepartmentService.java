package com.sams.service;

import com.sams.dto.LocDepartmentDTO;
import java.util.List;

public interface LocDepartmentService {
    LocDepartmentDTO create(LocDepartmentDTO dto);
    LocDepartmentDTO getById(Long id);
    List<LocDepartmentDTO> getAll();
    LocDepartmentDTO update(Long id, LocDepartmentDTO dto);
    void delete(Long id);
}