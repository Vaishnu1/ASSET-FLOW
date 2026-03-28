package com.sams.service;

import com.sams.dto.InsuranceTypeDTO;
import java.util.List;

public interface InsuranceTypeService {
    InsuranceTypeDTO create(InsuranceTypeDTO dto);
    InsuranceTypeDTO getById(Long id);
    List<InsuranceTypeDTO> getAll();
    InsuranceTypeDTO update(Long id, InsuranceTypeDTO dto);
    void delete(Long id);
}