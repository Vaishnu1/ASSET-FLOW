package com.sams.service;

import com.sams.dto.PrReasonDTO;
import java.util.List;

public interface PrReasonService {
    PrReasonDTO create(PrReasonDTO dto);
    PrReasonDTO getById(Long id);
    List<PrReasonDTO> getAll();
    PrReasonDTO update(Long id, PrReasonDTO dto);
    void delete(Long id);
}