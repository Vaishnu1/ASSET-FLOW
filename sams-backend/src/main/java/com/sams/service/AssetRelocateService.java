package com.sams.service;

import com.sams.dto.AssetRelocateDTO;
import java.util.List;

public interface AssetRelocateService {
    AssetRelocateDTO create(AssetRelocateDTO dto);
    AssetRelocateDTO getById(Long id);
    List<AssetRelocateDTO> getAll();
    AssetRelocateDTO update(Long id, AssetRelocateDTO dto);
    void delete(Long id);
}