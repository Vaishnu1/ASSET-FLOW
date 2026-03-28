package com.sams.service;

import com.sams.dto.LoanReturnDTO;
import java.util.List;

public interface LoanReturnService {
    LoanReturnDTO create(LoanReturnDTO dto);
    LoanReturnDTO getById(Long id);
    List<LoanReturnDTO> getAll();
    LoanReturnDTO update(Long id, LoanReturnDTO dto);
    void delete(Long id);
}