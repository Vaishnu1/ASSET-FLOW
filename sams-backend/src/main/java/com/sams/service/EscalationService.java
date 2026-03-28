package com.sams.service;

import com.sams.dto.EscalationDTO;
import java.util.List;

public interface EscalationService {
    EscalationDTO create(EscalationDTO dto);
    EscalationDTO getById(Long id);
    List<EscalationDTO> getAll();
    EscalationDTO update(Long id, EscalationDTO dto);
    void delete(Long id);
}