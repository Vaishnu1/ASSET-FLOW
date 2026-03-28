package com.sams.service;

import com.sams.dto.SrEscalationDTO;
import java.util.List;

public interface SrEscalationService {
    SrEscalationDTO create(SrEscalationDTO dto);
    SrEscalationDTO getById(Long id);
    List<SrEscalationDTO> getAll();
    SrEscalationDTO update(Long id, SrEscalationDTO dto);
    void delete(Long id);
}