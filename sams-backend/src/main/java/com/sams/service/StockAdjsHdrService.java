package com.sams.service;

import com.sams.dto.StockAdjsHdrDTO;
import java.util.List;

public interface StockAdjsHdrService {
    StockAdjsHdrDTO create(StockAdjsHdrDTO dto);
    StockAdjsHdrDTO getById(Long id);
    List<StockAdjsHdrDTO> getAll();
    StockAdjsHdrDTO update(Long id, StockAdjsHdrDTO dto);
    void delete(Long id);
}