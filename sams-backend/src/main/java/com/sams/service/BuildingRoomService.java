package com.sams.service;

import com.sams.dto.BuildingRoomDTO;
import java.util.List;

public interface BuildingRoomService {
    BuildingRoomDTO create(BuildingRoomDTO dto);
    BuildingRoomDTO getById(Long id);
    List<BuildingRoomDTO> getAll();
    BuildingRoomDTO update(Long id, BuildingRoomDTO dto);
    void delete(Long id);
}