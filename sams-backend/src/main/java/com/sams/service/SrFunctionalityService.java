package com.sams.service;

import com.sams.dto.SrFunctionalityDTO;
import java.util.List;

public interface SrFunctionalityService {
    SrFunctionalityDTO create(SrFunctionalityDTO dto);
    SrFunctionalityDTO getById(Long id);
    List<SrFunctionalityDTO> getAll();
    SrFunctionalityDTO update(Long id, SrFunctionalityDTO dto);
    void delete(Long id);
}