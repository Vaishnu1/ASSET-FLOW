package com.sams.service;

import com.sams.dto.AssigneeTypeDTO;
import java.util.List;

public interface AssigneeTypeService {
    AssigneeTypeDTO create(AssigneeTypeDTO dto);
    AssigneeTypeDTO getById(Long id);
    List<AssigneeTypeDTO> getAll();
    AssigneeTypeDTO update(Long id, AssigneeTypeDTO dto);
    void delete(Long id);
}