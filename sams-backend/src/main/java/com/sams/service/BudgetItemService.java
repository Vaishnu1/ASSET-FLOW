package com.sams.service;

import com.sams.dto.BudgetItemDTO;
import java.util.List;

public interface BudgetItemService {
    BudgetItemDTO create(BudgetItemDTO dto);
    BudgetItemDTO getById(Long id);
    List<BudgetItemDTO> getAll();
    BudgetItemDTO update(Long id, BudgetItemDTO dto);
    void delete(Long id);
}