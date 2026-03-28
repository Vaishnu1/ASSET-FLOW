package com.sams.service;

import com.sams.dto.CityDTO;
import java.util.List;

public interface CityService {
    CityDTO create(CityDTO dto);
    CityDTO getById(Long id);
    List<CityDTO> getAll();
    CityDTO update(Long id, CityDTO dto);
    void delete(Long id);
}