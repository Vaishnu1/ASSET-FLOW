package com.sams.service;

import com.sams.dto.AssetMaintenanceDTO;
import java.util.List;

public interface AssetMaintenanceService {
    AssetMaintenanceDTO create(AssetMaintenanceDTO dto);
    AssetMaintenanceDTO getById(Long id);
    List<AssetMaintenanceDTO> getAll();
    AssetMaintenanceDTO update(Long id, AssetMaintenanceDTO dto);
    void delete(Long id);
}