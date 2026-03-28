package com.sams.service;

import com.sams.dto.InventoryDtlDTO;
import java.util.List;

public interface InventoryDtlService {
    InventoryDtlDTO create(InventoryDtlDTO dto);
    InventoryDtlDTO getById(Long id);
    List<InventoryDtlDTO> getAll();
    InventoryDtlDTO update(Long id, InventoryDtlDTO dto);
    void delete(Long id);
}