package com.sams.service;

import com.sams.dto.CurrencyCodeDTO;
import java.util.List;

public interface CurrencyCodeService {
    CurrencyCodeDTO create(CurrencyCodeDTO dto);
    CurrencyCodeDTO getById(Long id);
    List<CurrencyCodeDTO> getAll();
    CurrencyCodeDTO update(Long id, CurrencyCodeDTO dto);
    void delete(Long id);
}