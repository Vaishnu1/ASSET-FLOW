package com.sams.service;

import com.sams.dto.InventoryAuditDTO;
import java.util.List;

public interface InventoryAuditService {
    InventoryAuditDTO create(InventoryAuditDTO dto);
    InventoryAuditDTO getById(Long id);
    List<InventoryAuditDTO> getAll();
    InventoryAuditDTO update(Long id, InventoryAuditDTO dto);
    void delete(Long id);
}