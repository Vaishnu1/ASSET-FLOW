package com.sams.service;

import com.sams.dto.RegionDTO;
import java.util.List;

public interface RegionService {
    RegionDTO create(RegionDTO dto);
    RegionDTO getById(Long id);
    List<RegionDTO> getAll();
    RegionDTO update(Long id, RegionDTO dto);
    void delete(Long id);
}