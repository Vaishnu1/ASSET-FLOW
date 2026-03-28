package com.sams.service;

import com.sams.dto.BudgetHdrDTO;
import java.util.List;

public interface BudgetHdrService {
    BudgetHdrDTO create(BudgetHdrDTO dto);
    BudgetHdrDTO getById(Long id);
    List<BudgetHdrDTO> getAll();
    BudgetHdrDTO update(Long id, BudgetHdrDTO dto);
    void delete(Long id);
}