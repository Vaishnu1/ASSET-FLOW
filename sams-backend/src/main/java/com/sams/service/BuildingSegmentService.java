package com.sams.service;

import com.sams.dto.BuildingSegmentDTO;
import java.util.List;

public interface BuildingSegmentService {
    BuildingSegmentDTO create(BuildingSegmentDTO dto);
    BuildingSegmentDTO getById(Long id);
    List<BuildingSegmentDTO> getAll();
    BuildingSegmentDTO update(Long id, BuildingSegmentDTO dto);
    void delete(Long id);
}