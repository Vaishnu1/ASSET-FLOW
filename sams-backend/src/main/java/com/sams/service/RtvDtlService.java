package com.sams.service;

import com.sams.dto.RtvDtlDTO;
import java.util.List;

public interface RtvDtlService {
    RtvDtlDTO create(RtvDtlDTO dto);
    RtvDtlDTO getById(Long id);
    List<RtvDtlDTO> getAll();
    RtvDtlDTO update(Long id, RtvDtlDTO dto);
    void delete(Long id);
}