package com.sams.service;

import com.sams.dto.SrActServiceCostDTO;
import java.util.List;

public interface SrActServiceCostService {
    SrActServiceCostDTO create(SrActServiceCostDTO dto);
    SrActServiceCostDTO getById(Long id);
    List<SrActServiceCostDTO> getAll();
    SrActServiceCostDTO update(Long id, SrActServiceCostDTO dto);
    void delete(Long id);
}