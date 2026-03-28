package com.sams.service;

import com.sams.dto.MaintenanceStrategyDTO;
import java.util.List;

public interface MaintenanceStrategyService {
    MaintenanceStrategyDTO create(MaintenanceStrategyDTO dto);
    MaintenanceStrategyDTO getById(Long id);
    List<MaintenanceStrategyDTO> getAll();
    MaintenanceStrategyDTO update(Long id, MaintenanceStrategyDTO dto);
    void delete(Long id);
}