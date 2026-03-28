package com.sams.service;

import com.sams.dto.PurchaseProcessDTO;
import java.util.List;

public interface PurchaseProcessService {
    PurchaseProcessDTO create(PurchaseProcessDTO dto);
    PurchaseProcessDTO getById(Long id);
    List<PurchaseProcessDTO> getAll();
    PurchaseProcessDTO update(Long id, PurchaseProcessDTO dto);
    void delete(Long id);
}