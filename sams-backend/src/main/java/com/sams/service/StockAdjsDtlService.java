package com.sams.service;

import com.sams.dto.StockAdjsDtlDTO;
import java.util.List;

public interface StockAdjsDtlService {
    StockAdjsDtlDTO create(StockAdjsDtlDTO dto);
    StockAdjsDtlDTO getById(Long id);
    List<StockAdjsDtlDTO> getAll();
    StockAdjsDtlDTO update(Long id, StockAdjsDtlDTO dto);
    void delete(Long id);
}