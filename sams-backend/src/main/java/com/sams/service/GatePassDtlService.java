package com.sams.service;

import com.sams.dto.GatePassDtlDTO;
import java.util.List;

public interface GatePassDtlService {
    GatePassDtlDTO create(GatePassDtlDTO dto);
    GatePassDtlDTO getById(Long id);
    List<GatePassDtlDTO> getAll();
    GatePassDtlDTO update(Long id, GatePassDtlDTO dto);
    void delete(Long id);
}