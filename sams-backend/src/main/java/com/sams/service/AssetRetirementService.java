package com.sams.service;

import com.sams.dto.AssetRetirementDTO;
import java.util.List;

public interface AssetRetirementService {
    AssetRetirementDTO create(AssetRetirementDTO dto);
    AssetRetirementDTO getById(Long id);
    List<AssetRetirementDTO> getAll();
    AssetRetirementDTO update(Long id, AssetRetirementDTO dto);
    void delete(Long id);
}