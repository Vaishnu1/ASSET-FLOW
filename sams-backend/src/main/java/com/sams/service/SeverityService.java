package com.sams.service;

import com.sams.dto.SeverityDTO;
import java.util.List;

public interface SeverityService {
    SeverityDTO createSeverity(SeverityDTO dto);
    SeverityDTO getSeverityById(Long id);
    List<SeverityDTO> getAllSeverities();
    SeverityDTO updateSeverity(Long id, SeverityDTO dto);
    void deleteSeverity(Long id);
}