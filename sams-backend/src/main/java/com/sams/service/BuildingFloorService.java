package com.sams.service;

import com.sams.dto.BuildingFloorDTO;
import java.util.List;

public interface BuildingFloorService {
    BuildingFloorDTO create(BuildingFloorDTO dto);
    BuildingFloorDTO getById(Long id);
    List<BuildingFloorDTO> getAll();
    BuildingFloorDTO update(Long id, BuildingFloorDTO dto);
    void delete(Long id);
}