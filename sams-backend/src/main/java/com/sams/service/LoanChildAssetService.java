package com.sams.service;

import com.sams.dto.LoanChildAssetDTO;
import java.util.List;

public interface LoanChildAssetService {
    LoanChildAssetDTO create(LoanChildAssetDTO dto);
    LoanChildAssetDTO getById(Long id);
    List<LoanChildAssetDTO> getAll();
    LoanChildAssetDTO update(Long id, LoanChildAssetDTO dto);
    void delete(Long id);
}