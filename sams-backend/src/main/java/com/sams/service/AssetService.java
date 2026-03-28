package com.sams.service;

import com.sams.dto.AssetDTO;
import java.util.List;

public interface AssetService {
    AssetDTO createAsset(AssetDTO assetDTO);
    AssetDTO getAssetById(Long id);
    List<AssetDTO> getAllAssets();
    AssetDTO updateAsset(Long id, AssetDTO assetDTO);
    void deleteAsset(Long id);
}
