package com.sams.service;

import com.sams.dto.LoanStatusDTO;
import java.util.List;

public interface LoanStatusService {
    LoanStatusDTO create(LoanStatusDTO dto);
    LoanStatusDTO getById(Long id);
    List<LoanStatusDTO> getAll();
    LoanStatusDTO update(Long id, LoanStatusDTO dto);
    void delete(Long id);
}