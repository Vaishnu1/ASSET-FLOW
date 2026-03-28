package com.sams.service;

import com.sams.dto.AssetGroupDTO;
import java.util.List;

public interface AssetGroupService {
    AssetGroupDTO createAssetGroup(AssetGroupDTO dto);
    AssetGroupDTO getAssetGroupById(Long id);
    List<AssetGroupDTO> getAllAssetGroups();
    AssetGroupDTO updateAssetGroup(Long id, AssetGroupDTO dto);
    void deleteAssetGroup(Long id);
}