package com.sams.service;

import com.sams.dto.AssetInfoDTO;
import java.util.List;

public interface AssetInfoService {
    AssetInfoDTO create(AssetInfoDTO dto);
    AssetInfoDTO getById(Long id);
    List<AssetInfoDTO> getAll();
    AssetInfoDTO update(Long id, AssetInfoDTO dto);
    void delete(Long id);
}