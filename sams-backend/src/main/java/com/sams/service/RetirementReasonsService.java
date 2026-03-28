package com.sams.service;

import com.sams.dto.RetirementReasonsDTO;
import java.util.List;

public interface RetirementReasonsService {
    RetirementReasonsDTO create(RetirementReasonsDTO dto);
    RetirementReasonsDTO getById(Long id);
    List<RetirementReasonsDTO> getAll();
    RetirementReasonsDTO update(Long id, RetirementReasonsDTO dto);
    void delete(Long id);
}