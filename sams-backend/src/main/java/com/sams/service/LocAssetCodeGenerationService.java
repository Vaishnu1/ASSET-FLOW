package com.sams.service;

import com.sams.dto.LocAssetCodeGenerationDTO;
import java.util.List;

public interface LocAssetCodeGenerationService {
    LocAssetCodeGenerationDTO create(LocAssetCodeGenerationDTO dto);
    LocAssetCodeGenerationDTO getById(Long id);
    List<LocAssetCodeGenerationDTO> getAll();
    LocAssetCodeGenerationDTO update(Long id, LocAssetCodeGenerationDTO dto);
    void delete(Long id);
}