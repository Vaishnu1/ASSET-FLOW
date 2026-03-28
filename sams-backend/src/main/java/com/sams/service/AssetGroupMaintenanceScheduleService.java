package com.sams.service;

import com.sams.dto.AssetGroupMaintenanceScheduleDTO;
import java.util.List;

public interface AssetGroupMaintenanceScheduleService {
    AssetGroupMaintenanceScheduleDTO create(AssetGroupMaintenanceScheduleDTO dto);
    AssetGroupMaintenanceScheduleDTO getById(Long id);
    List<AssetGroupMaintenanceScheduleDTO> getAll();
    AssetGroupMaintenanceScheduleDTO update(Long id, AssetGroupMaintenanceScheduleDTO dto);
    void delete(Long id);
}