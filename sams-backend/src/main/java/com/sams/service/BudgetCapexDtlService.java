package com.sams.service;

import com.sams.dto.BudgetCapexDtlDTO;
import java.util.List;

public interface BudgetCapexDtlService {
    BudgetCapexDtlDTO create(BudgetCapexDtlDTO dto);
    BudgetCapexDtlDTO getById(Long id);
    List<BudgetCapexDtlDTO> getAll();
    BudgetCapexDtlDTO update(Long id, BudgetCapexDtlDTO dto);
    void delete(Long id);
}