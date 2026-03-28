package com.sams.service;

import com.sams.dto.StockIndentHdrDTO;
import java.util.List;

public interface StockIndentHdrService {
    StockIndentHdrDTO create(StockIndentHdrDTO dto);
    StockIndentHdrDTO getById(Long id);
    List<StockIndentHdrDTO> getAll();
    StockIndentHdrDTO update(Long id, StockIndentHdrDTO dto);
    void delete(Long id);
}