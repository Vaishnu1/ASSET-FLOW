package com.sams.service;

import com.sams.dto.AssetProcessStatusDTO;
import java.util.List;

public interface AssetProcessStatusService {
    AssetProcessStatusDTO create(AssetProcessStatusDTO dto);
    AssetProcessStatusDTO getById(Long id);
    List<AssetProcessStatusDTO> getAll();
    AssetProcessStatusDTO update(Long id, AssetProcessStatusDTO dto);
    void delete(Long id);
}