package com.sams.service;

import com.sams.dto.PurchasingTypeDTO;
import java.util.List;

public interface PurchasingTypeService {
    PurchasingTypeDTO create(PurchasingTypeDTO dto);
    PurchasingTypeDTO getById(Long id);
    List<PurchasingTypeDTO> getAll();
    PurchasingTypeDTO update(Long id, PurchasingTypeDTO dto);
    void delete(Long id);
}