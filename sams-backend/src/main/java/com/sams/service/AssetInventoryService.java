package com.sams.service;

import com.sams.dto.AssetInventoryDTO;
import java.util.List;

public interface AssetInventoryService {
    AssetInventoryDTO create(AssetInventoryDTO dto);
    AssetInventoryDTO getById(Long id);
    List<AssetInventoryDTO> getAll();
    AssetInventoryDTO update(Long id, AssetInventoryDTO dto);
    void delete(Long id);
}