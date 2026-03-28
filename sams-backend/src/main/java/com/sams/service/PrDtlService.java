package com.sams.service;

import com.sams.dto.PrDtlDTO;
import java.util.List;

public interface PrDtlService {
    PrDtlDTO create(PrDtlDTO dto);
    PrDtlDTO getById(Long id);
    List<PrDtlDTO> getAll();
    PrDtlDTO update(Long id, PrDtlDTO dto);
    void delete(Long id);
}