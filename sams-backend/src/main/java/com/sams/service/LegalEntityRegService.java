package com.sams.service;

import com.sams.dto.LegalEntityRegDTO;
import java.util.List;

public interface LegalEntityRegService {
    LegalEntityRegDTO create(LegalEntityRegDTO dto);
    LegalEntityRegDTO getById(Long id);
    List<LegalEntityRegDTO> getAll();
    LegalEntityRegDTO update(Long id, LegalEntityRegDTO dto);
    void delete(Long id);
}