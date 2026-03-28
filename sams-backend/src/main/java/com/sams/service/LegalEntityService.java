package com.sams.service;

import com.sams.dto.LegalEntityDTO;
import java.util.List;

public interface LegalEntityService {
    LegalEntityDTO create(LegalEntityDTO dto);
    LegalEntityDTO getById(Long id);
    List<LegalEntityDTO> getAll();
    LegalEntityDTO update(Long id, LegalEntityDTO dto);
    void delete(Long id);
}