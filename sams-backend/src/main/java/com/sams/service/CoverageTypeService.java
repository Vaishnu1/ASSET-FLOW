package com.sams.service;

import com.sams.dto.CoverageTypeDTO;
import java.util.List;

public interface CoverageTypeService {
    CoverageTypeDTO create(CoverageTypeDTO dto);
    CoverageTypeDTO getById(Long id);
    List<CoverageTypeDTO> getAll();
    CoverageTypeDTO update(Long id, CoverageTypeDTO dto);
    void delete(Long id);
}