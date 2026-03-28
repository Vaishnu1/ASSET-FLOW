package com.sams.service;

import com.sams.dto.PoPriceDtlDTO;
import java.util.List;

public interface PoPriceDtlService {
    PoPriceDtlDTO create(PoPriceDtlDTO dto);
    PoPriceDtlDTO getById(Long id);
    List<PoPriceDtlDTO> getAll();
    PoPriceDtlDTO update(Long id, PoPriceDtlDTO dto);
    void delete(Long id);
}