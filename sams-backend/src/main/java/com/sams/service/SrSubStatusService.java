package com.sams.service;

import com.sams.dto.SrSubStatusDTO;
import java.util.List;

public interface SrSubStatusService {
    SrSubStatusDTO create(SrSubStatusDTO dto);
    SrSubStatusDTO getById(Long id);
    List<SrSubStatusDTO> getAll();
    SrSubStatusDTO update(Long id, SrSubStatusDTO dto);
    void delete(Long id);
}