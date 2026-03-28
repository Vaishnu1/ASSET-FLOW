package com.sams.service;

import com.sams.dto.AssetCategoryDTO;
import java.util.List;

public interface AssetCategoryService {
    AssetCategoryDTO createAssetCategory(AssetCategoryDTO dto);
    AssetCategoryDTO getAssetCategoryById(Long id);
    List<AssetCategoryDTO> getAllAssetCategories();
    AssetCategoryDTO updateAssetCategory(Long id, AssetCategoryDTO dto);
    void deleteAssetCategory(Long id);
}