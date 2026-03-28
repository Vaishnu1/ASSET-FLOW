package com.sams.service;

import com.sams.dto.AssetSubCategoryDTO;
import java.util.List;

public interface AssetSubCategoryService {
    AssetSubCategoryDTO createAssetSubCategory(AssetSubCategoryDTO dto);
    AssetSubCategoryDTO getAssetSubCategoryById(Long id);
    List<AssetSubCategoryDTO> getAllAssetSubCategories();
    AssetSubCategoryDTO updateAssetSubCategory(Long id, AssetSubCategoryDTO dto);
    void deleteAssetSubCategory(Long id);
}