package com.sams.service;

import com.sams.dto.FunctionalityDTO;
import java.util.List;

public interface FunctionalityService {
    FunctionalityDTO create(FunctionalityDTO dto);
    FunctionalityDTO getById(Long id);
    List<FunctionalityDTO> getAll();
    FunctionalityDTO update(Long id, FunctionalityDTO dto);
    void delete(Long id);
}