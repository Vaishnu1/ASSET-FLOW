package com.sams.service;

import com.sams.dto.SrScheduleFrequencyDTO;
import java.util.List;

public interface SrScheduleFrequencyService {
    SrScheduleFrequencyDTO create(SrScheduleFrequencyDTO dto);
    SrScheduleFrequencyDTO getById(Long id);
    List<SrScheduleFrequencyDTO> getAll();
    SrScheduleFrequencyDTO update(Long id, SrScheduleFrequencyDTO dto);
    void delete(Long id);
}