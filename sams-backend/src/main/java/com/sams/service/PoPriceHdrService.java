package com.sams.service;

import com.sams.dto.PoPriceHdrDTO;
import java.util.List;

public interface PoPriceHdrService {
    PoPriceHdrDTO create(PoPriceHdrDTO dto);
    PoPriceHdrDTO getById(Long id);
    List<PoPriceHdrDTO> getAll();
    PoPriceHdrDTO update(Long id, PoPriceHdrDTO dto);
    void delete(Long id);
}