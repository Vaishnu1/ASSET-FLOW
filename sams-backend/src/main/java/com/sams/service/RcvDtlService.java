package com.sams.service;

import com.sams.dto.RcvDtlDTO;
import java.util.List;

public interface RcvDtlService {
    RcvDtlDTO create(RcvDtlDTO dto);
    RcvDtlDTO getById(Long id);
    List<RcvDtlDTO> getAll();
    RcvDtlDTO update(Long id, RcvDtlDTO dto);
    void delete(Long id);
}