package com.sams.service;

import com.sams.dto.SrAttribute4DTO;
import java.util.List;

public interface SrAttribute4Service {
    SrAttribute4DTO create(SrAttribute4DTO dto);
    SrAttribute4DTO getById(Long id);
    List<SrAttribute4DTO> getAll();
    SrAttribute4DTO update(Long id, SrAttribute4DTO dto);
    void delete(Long id);
}