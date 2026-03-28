package com.sams.service;

import com.sams.dto.GrnForDTO;
import java.util.List;

public interface GrnForService {
    GrnForDTO create(GrnForDTO dto);
    GrnForDTO getById(Long id);
    List<GrnForDTO> getAll();
    GrnForDTO update(Long id, GrnForDTO dto);
    void delete(Long id);
}