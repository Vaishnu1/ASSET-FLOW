package com.sams.service;

import com.sams.dto.SrCheckPointsDTO;
import java.util.List;

public interface SrCheckPointsService {
    SrCheckPointsDTO create(SrCheckPointsDTO dto);
    SrCheckPointsDTO getById(Long id);
    List<SrCheckPointsDTO> getAll();
    SrCheckPointsDTO update(Long id, SrCheckPointsDTO dto);
    void delete(Long id);
}