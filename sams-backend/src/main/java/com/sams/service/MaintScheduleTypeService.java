package com.sams.service;

import com.sams.dto.MaintScheduleTypeDTO;
import java.util.List;

public interface MaintScheduleTypeService {
    MaintScheduleTypeDTO create(MaintScheduleTypeDTO dto);
    MaintScheduleTypeDTO getById(Long id);
    List<MaintScheduleTypeDTO> getAll();
    MaintScheduleTypeDTO update(Long id, MaintScheduleTypeDTO dto);
    void delete(Long id);
}