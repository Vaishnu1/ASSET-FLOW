package com.sams.service;

import com.sams.dto.StockTransferDtlDTO;
import java.util.List;

public interface StockTransferDtlService {
    StockTransferDtlDTO create(StockTransferDtlDTO dto);
    StockTransferDtlDTO getById(Long id);
    List<StockTransferDtlDTO> getAll();
    StockTransferDtlDTO update(Long id, StockTransferDtlDTO dto);
    void delete(Long id);
}