package com.sams.service;

import com.sams.dto.SrActivityFindingsDTO;
import java.util.List;

public interface SrActivityFindingsService {
    SrActivityFindingsDTO create(SrActivityFindingsDTO dto);
    SrActivityFindingsDTO getById(Long id);
    List<SrActivityFindingsDTO> getAll();
    SrActivityFindingsDTO update(Long id, SrActivityFindingsDTO dto);
    void delete(Long id);
}