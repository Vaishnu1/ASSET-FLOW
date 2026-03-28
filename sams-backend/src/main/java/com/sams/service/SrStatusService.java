package com.sams.service;

import com.sams.dto.SrStatusDTO;
import java.util.List;

public interface SrStatusService {
    SrStatusDTO create(SrStatusDTO dto);
    SrStatusDTO getById(Long id);
    List<SrStatusDTO> getAll();
    SrStatusDTO update(Long id, SrStatusDTO dto);
    void delete(Long id);
}