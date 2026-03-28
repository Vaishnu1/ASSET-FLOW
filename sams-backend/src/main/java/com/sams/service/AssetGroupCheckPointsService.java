package com.sams.service;

import com.sams.dto.AssetGroupCheckPointsDTO;
import java.util.List;

public interface AssetGroupCheckPointsService {
    AssetGroupCheckPointsDTO create(AssetGroupCheckPointsDTO dto);
    AssetGroupCheckPointsDTO getById(Long id);
    List<AssetGroupCheckPointsDTO> getAll();
    AssetGroupCheckPointsDTO update(Long id, AssetGroupCheckPointsDTO dto);
    void delete(Long id);
}