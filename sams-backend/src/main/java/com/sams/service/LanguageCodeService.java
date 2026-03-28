package com.sams.service;

import com.sams.dto.LanguageCodeDTO;
import java.util.List;

public interface LanguageCodeService {
    LanguageCodeDTO create(LanguageCodeDTO dto);
    LanguageCodeDTO getById(Long id);
    List<LanguageCodeDTO> getAll();
    LanguageCodeDTO update(Long id, LanguageCodeDTO dto);
    void delete(Long id);
}