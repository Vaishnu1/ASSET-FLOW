package com.sams.service;

import com.sams.dto.BudgetDtlDTO;
import java.util.List;

public interface BudgetDtlService {
    BudgetDtlDTO create(BudgetDtlDTO dto);
    BudgetDtlDTO getById(Long id);
    List<BudgetDtlDTO> getAll();
    BudgetDtlDTO update(Long id, BudgetDtlDTO dto);
    void delete(Long id);
}