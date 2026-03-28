package com.sams.service;

import com.sams.dto.AssetStatusDTO;
import java.util.List;

public interface AssetStatusService {
    AssetStatusDTO createAssetStatus(AssetStatusDTO dto);
    AssetStatusDTO getAssetStatusById(Long id);
    List<AssetStatusDTO> getAllAssetStatuses();
    AssetStatusDTO updateAssetStatus(Long id, AssetStatusDTO dto);
    void deleteAssetStatus(Long id);
}