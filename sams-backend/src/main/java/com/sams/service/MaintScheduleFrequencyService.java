package com.sams.service;

import com.sams.dto.MaintScheduleFrequencyDTO;
import java.util.List;

public interface MaintScheduleFrequencyService {
    MaintScheduleFrequencyDTO create(MaintScheduleFrequencyDTO dto);
    MaintScheduleFrequencyDTO getById(Long id);
    List<MaintScheduleFrequencyDTO> getAll();
    MaintScheduleFrequencyDTO update(Long id, MaintScheduleFrequencyDTO dto);
    void delete(Long id);
}