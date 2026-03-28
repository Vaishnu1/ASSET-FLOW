package com.sams.service;

import com.sams.dto.AssetCheckPointsDTO;
import java.util.List;

public interface AssetCheckPointsService {
    AssetCheckPointsDTO create(AssetCheckPointsDTO dto);
    AssetCheckPointsDTO getById(Long id);
    List<AssetCheckPointsDTO> getAll();
    AssetCheckPointsDTO update(Long id, AssetCheckPointsDTO dto);
    void delete(Long id);
}