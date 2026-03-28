package com.sams.service;

import com.sams.dto.MaintScheduleHdrDTO;
import java.util.List;

public interface MaintScheduleHdrService {
    MaintScheduleHdrDTO create(MaintScheduleHdrDTO dto);
    MaintScheduleHdrDTO getById(Long id);
    List<MaintScheduleHdrDTO> getAll();
    MaintScheduleHdrDTO update(Long id, MaintScheduleHdrDTO dto);
    void delete(Long id);
}