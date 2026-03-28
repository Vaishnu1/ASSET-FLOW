package com.sams.service;

import com.sams.dto.AssetCustFieldValueDTO;
import java.util.List;

public interface AssetCustFieldValueService {
    AssetCustFieldValueDTO createAssetCustFieldValue(AssetCustFieldValueDTO dto);
    AssetCustFieldValueDTO getAssetCustFieldValueById(Long id);
    List<AssetCustFieldValueDTO> getAllAssetCustFieldValues();
    AssetCustFieldValueDTO updateAssetCustFieldValue(Long id, AssetCustFieldValueDTO dto);
    void deleteAssetCustFieldValue(Long id);
}