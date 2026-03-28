package com.sams.service;

import com.sams.dto.GrnHdrDTO;
import java.util.List;

public interface GrnHdrService {
    GrnHdrDTO create(GrnHdrDTO dto);
    GrnHdrDTO getById(Long id);
    List<GrnHdrDTO> getAll();
    GrnHdrDTO update(Long id, GrnHdrDTO dto);
    void delete(Long id);
}