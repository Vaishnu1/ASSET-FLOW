package com.sams.service;

import com.sams.dto.AssetGroupCheckListDTO;
import java.util.List;

public interface AssetGroupCheckListService {
    AssetGroupCheckListDTO createAssetGroupCheckList(AssetGroupCheckListDTO dto);
    AssetGroupCheckListDTO getAssetGroupCheckListById(Long id);
    List<AssetGroupCheckListDTO> getAllAssetGroupCheckLists();
    AssetGroupCheckListDTO updateAssetGroupCheckList(Long id, AssetGroupCheckListDTO dto);
    void deleteAssetGroupCheckList(Long id);
}