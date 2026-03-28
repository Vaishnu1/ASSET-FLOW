package com.sams.service;

import com.sams.dto.StockIndentDtlDTO;
import java.util.List;

public interface StockIndentDtlService {
    StockIndentDtlDTO create(StockIndentDtlDTO dto);
    StockIndentDtlDTO getById(Long id);
    List<StockIndentDtlDTO> getAll();
    StockIndentDtlDTO update(Long id, StockIndentDtlDTO dto);
    void delete(Long id);
}