package com.sams.service;

import com.sams.dto.PurchaseTcTemplateHdrDTO;
import java.util.List;

public interface PurchaseTcTemplateHdrService {
    PurchaseTcTemplateHdrDTO create(PurchaseTcTemplateHdrDTO dto);
    PurchaseTcTemplateHdrDTO getById(Long id);
    List<PurchaseTcTemplateHdrDTO> getAll();
    PurchaseTcTemplateHdrDTO update(Long id, PurchaseTcTemplateHdrDTO dto);
    void delete(Long id);
}