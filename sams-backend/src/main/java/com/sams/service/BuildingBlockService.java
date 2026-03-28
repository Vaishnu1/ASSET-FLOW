package com.sams.service;

import com.sams.dto.BuildingBlockDTO;
import java.util.List;

public interface BuildingBlockService {
    BuildingBlockDTO create(BuildingBlockDTO dto);
    BuildingBlockDTO getById(Long id);
    List<BuildingBlockDTO> getAll();
    BuildingBlockDTO update(Long id, BuildingBlockDTO dto);
    void delete(Long id);
}