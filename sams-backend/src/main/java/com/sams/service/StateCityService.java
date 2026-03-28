package com.sams.service;

import com.sams.dto.StateCityDTO;
import java.util.List;

public interface StateCityService {
    StateCityDTO create(StateCityDTO dto);
    StateCityDTO getById(Long id);
    List<StateCityDTO> getAll();
    StateCityDTO update(Long id, StateCityDTO dto);
    void delete(Long id);
}