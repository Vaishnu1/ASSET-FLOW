package com.sams.service;

import com.sams.dto.RcvDtlLinesDTO;
import java.util.List;

public interface RcvDtlLinesService {
    RcvDtlLinesDTO create(RcvDtlLinesDTO dto);
    RcvDtlLinesDTO getById(Long id);
    List<RcvDtlLinesDTO> getAll();
    RcvDtlLinesDTO update(Long id, RcvDtlLinesDTO dto);
    void delete(Long id);
}