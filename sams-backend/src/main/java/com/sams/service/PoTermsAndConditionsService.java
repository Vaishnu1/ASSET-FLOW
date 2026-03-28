package com.sams.service;

import com.sams.dto.PoTermsAndConditionsDTO;
import java.util.List;

public interface PoTermsAndConditionsService {
    PoTermsAndConditionsDTO create(PoTermsAndConditionsDTO dto);
    PoTermsAndConditionsDTO getById(Long id);
    List<PoTermsAndConditionsDTO> getAll();
    PoTermsAndConditionsDTO update(Long id, PoTermsAndConditionsDTO dto);
    void delete(Long id);
}