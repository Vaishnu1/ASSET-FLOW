package com.sams.service;

import com.sams.dto.StatusTypeDTO;
import java.util.List;

public interface StatusTypeService {
    StatusTypeDTO create(StatusTypeDTO dto);
    StatusTypeDTO getById(Long id);
    List<StatusTypeDTO> getAll();
    StatusTypeDTO update(Long id, StatusTypeDTO dto);
    void delete(Long id);
}