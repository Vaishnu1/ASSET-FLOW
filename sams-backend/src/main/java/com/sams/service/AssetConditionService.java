package com.sams.service;

import com.sams.dto.AssetConditionDTO;
import java.util.List;

public interface AssetConditionService {
    AssetConditionDTO create(AssetConditionDTO dto);
    AssetConditionDTO getById(Long id);
    List<AssetConditionDTO> getAll();
    AssetConditionDTO update(Long id, AssetConditionDTO dto);
    void delete(Long id);
}