package com.sams.service;

import com.sams.dto.PrHdrDTO;
import java.util.List;

public interface PrHdrService {
    PrHdrDTO create(PrHdrDTO dto);
    PrHdrDTO getById(Long id);
    List<PrHdrDTO> getAll();
    PrHdrDTO update(Long id, PrHdrDTO dto);
    void delete(Long id);
}