package com.sams.service;

import com.sams.dto.SrAttribute5DTO;
import java.util.List;

public interface SrAttribute5Service {
    SrAttribute5DTO create(SrAttribute5DTO dto);
    SrAttribute5DTO getById(Long id);
    List<SrAttribute5DTO> getAll();
    SrAttribute5DTO update(Long id, SrAttribute5DTO dto);
    void delete(Long id);
}