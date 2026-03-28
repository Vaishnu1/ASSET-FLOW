package com.sams.service;

import com.sams.dto.PurchaseTcTemplateDtlDTO;
import java.util.List;

public interface PurchaseTcTemplateDtlService {
    PurchaseTcTemplateDtlDTO create(PurchaseTcTemplateDtlDTO dto);
    PurchaseTcTemplateDtlDTO getById(Long id);
    List<PurchaseTcTemplateDtlDTO> getAll();
    PurchaseTcTemplateDtlDTO update(Long id, PurchaseTcTemplateDtlDTO dto);
    void delete(Long id);
}