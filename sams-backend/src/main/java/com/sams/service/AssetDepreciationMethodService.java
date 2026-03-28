package com.sams.service;

import com.sams.dto.AssetDepreciationMethodDTO;
import java.util.List;

public interface AssetDepreciationMethodService {
    AssetDepreciationMethodDTO create(AssetDepreciationMethodDTO dto);
    AssetDepreciationMethodDTO getById(Long id);
    List<AssetDepreciationMethodDTO> getAll();
    AssetDepreciationMethodDTO update(Long id, AssetDepreciationMethodDTO dto);
    void delete(Long id);
}