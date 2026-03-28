package com.sams.service;

import com.sams.dto.StockTransferHdrDTO;
import java.util.List;

public interface StockTransferHdrService {
    StockTransferHdrDTO create(StockTransferHdrDTO dto);
    StockTransferHdrDTO getById(Long id);
    List<StockTransferHdrDTO> getAll();
    StockTransferHdrDTO update(Long id, StockTransferHdrDTO dto);
    void delete(Long id);
}