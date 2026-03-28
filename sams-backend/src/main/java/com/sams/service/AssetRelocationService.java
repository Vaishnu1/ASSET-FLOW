package com.sams.service;

import com.sams.dto.AssetRelocationDTO;
import java.util.List;

public interface AssetRelocationService {
    AssetRelocationDTO createAssetRelocation(AssetRelocationDTO dto);
    AssetRelocationDTO getAssetRelocationById(Long id);
    List<AssetRelocationDTO> getAllAssetRelocations();
    AssetRelocationDTO updateAssetRelocation(Long id, AssetRelocationDTO dto);
    void deleteAssetRelocation(Long id);
}