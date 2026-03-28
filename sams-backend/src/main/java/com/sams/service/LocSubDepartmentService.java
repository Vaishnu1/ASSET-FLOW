package com.sams.service;

import com.sams.dto.LocSubDepartmentDTO;
import java.util.List;

public interface LocSubDepartmentService {
    LocSubDepartmentDTO create(LocSubDepartmentDTO dto);
    LocSubDepartmentDTO getById(Long id);
    List<LocSubDepartmentDTO> getAll();
    LocSubDepartmentDTO update(Long id, LocSubDepartmentDTO dto);
    void delete(Long id);
}