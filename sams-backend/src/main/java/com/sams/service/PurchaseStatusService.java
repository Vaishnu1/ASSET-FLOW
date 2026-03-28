package com.sams.service;

import com.sams.dto.PurchaseStatusDTO;
import java.util.List;

public interface PurchaseStatusService {
    PurchaseStatusDTO create(PurchaseStatusDTO dto);
    PurchaseStatusDTO getById(Long id);
    List<PurchaseStatusDTO> getAll();
    PurchaseStatusDTO update(Long id, PurchaseStatusDTO dto);
    void delete(Long id);
}