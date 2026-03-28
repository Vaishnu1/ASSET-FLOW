package com.sams.service;

import com.sams.dto.SrActivityDTO;
import java.util.List;

public interface SrActivityService {
    SrActivityDTO create(SrActivityDTO dto);
    SrActivityDTO getById(Long id);
    List<SrActivityDTO> getAll();
    SrActivityDTO update(Long id, SrActivityDTO dto);
    void delete(Long id);
}