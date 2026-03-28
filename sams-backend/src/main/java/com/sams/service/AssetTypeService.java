package com.sams.service;

import com.sams.dto.AssetTypeDTO;
import java.util.List;

public interface AssetTypeService {
    AssetTypeDTO createAssetType(AssetTypeDTO dto);
    AssetTypeDTO getAssetTypeById(Long id);
    List<AssetTypeDTO> getAllAssetTypes();
    AssetTypeDTO updateAssetType(Long id, AssetTypeDTO dto);
    void deleteAssetType(Long id);
}