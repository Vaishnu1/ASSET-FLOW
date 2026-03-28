package com.sams.service;

import com.sams.dto.PoTcTriggerEventDTO;
import java.util.List;

public interface PoTcTriggerEventService {
    PoTcTriggerEventDTO create(PoTcTriggerEventDTO dto);
    PoTcTriggerEventDTO getById(Long id);
    List<PoTcTriggerEventDTO> getAll();
    PoTcTriggerEventDTO update(Long id, PoTcTriggerEventDTO dto);
    void delete(Long id);
}