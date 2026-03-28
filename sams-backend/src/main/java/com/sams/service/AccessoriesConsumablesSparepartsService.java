package com.sams.service;

import com.sams.dto.AccessoriesConsumablesSparepartsDTO;
import java.util.List;

public interface AccessoriesConsumablesSparepartsService {
    AccessoriesConsumablesSparepartsDTO create(AccessoriesConsumablesSparepartsDTO dto);
    AccessoriesConsumablesSparepartsDTO getById(Long id);
    List<AccessoriesConsumablesSparepartsDTO> getAll();
    AccessoriesConsumablesSparepartsDTO update(Long id, AccessoriesConsumablesSparepartsDTO dto);
    void delete(Long id);
}