package com.sams.service;

import com.sams.dto.TaxDTO;
import java.util.List;

public interface TaxService {
    TaxDTO create(TaxDTO dto);
    TaxDTO getById(Long id);
    List<TaxDTO> getAll();
    TaxDTO update(Long id, TaxDTO dto);
    void delete(Long id);
}