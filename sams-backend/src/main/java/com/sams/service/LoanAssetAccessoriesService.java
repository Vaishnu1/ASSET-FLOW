package com.sams.service;

import com.sams.dto.LoanAssetAccessoriesDTO;
import java.util.List;

public interface LoanAssetAccessoriesService {
    LoanAssetAccessoriesDTO create(LoanAssetAccessoriesDTO dto);
    LoanAssetAccessoriesDTO getById(Long id);
    List<LoanAssetAccessoriesDTO> getAll();
    LoanAssetAccessoriesDTO update(Long id, LoanAssetAccessoriesDTO dto);
    void delete(Long id);
}