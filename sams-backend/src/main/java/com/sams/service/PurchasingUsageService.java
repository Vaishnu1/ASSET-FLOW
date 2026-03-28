package com.sams.service;

import com.sams.dto.PurchasingUsageDTO;
import java.util.List;

public interface PurchasingUsageService {
    PurchasingUsageDTO create(PurchasingUsageDTO dto);
    PurchasingUsageDTO getById(Long id);
    List<PurchasingUsageDTO> getAll();
    PurchasingUsageDTO update(Long id, PurchasingUsageDTO dto);
    void delete(Long id);
}