package com.sams.service;

import com.sams.dto.GrnDtlDTO;
import java.util.List;

public interface GrnDtlService {
    GrnDtlDTO create(GrnDtlDTO dto);
    GrnDtlDTO getById(Long id);
    List<GrnDtlDTO> getAll();
    GrnDtlDTO update(Long id, GrnDtlDTO dto);
    void delete(Long id);
}