package com.sams.service;

import com.sams.dto.AssetGroupDtlDTO;
import java.util.List;

public interface AssetGroupDtlService {
    AssetGroupDtlDTO createAssetGroupDtl(AssetGroupDtlDTO dto);
    AssetGroupDtlDTO getAssetGroupDtlById(Long id);
    List<AssetGroupDtlDTO> getAllAssetGroupDtls();
    AssetGroupDtlDTO updateAssetGroupDtl(Long id, AssetGroupDtlDTO dto);
    void deleteAssetGroupDtl(Long id);
}