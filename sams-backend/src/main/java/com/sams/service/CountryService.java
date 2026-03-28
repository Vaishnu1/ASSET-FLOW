package com.sams.service;

import com.sams.dto.CountryDTO;
import java.util.List;

public interface CountryService {
    CountryDTO create(CountryDTO dto);
    CountryDTO getById(Long id);
    List<CountryDTO> getAll();
    CountryDTO update(Long id, CountryDTO dto);
    void delete(Long id);
}