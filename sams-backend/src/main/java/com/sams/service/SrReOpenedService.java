package com.sams.service;

import com.sams.dto.SrReOpenedDTO;
import java.util.List;

public interface SrReOpenedService {
    SrReOpenedDTO create(SrReOpenedDTO dto);
    SrReOpenedDTO getById(Long id);
    List<SrReOpenedDTO> getAll();
    SrReOpenedDTO update(Long id, SrReOpenedDTO dto);
    void delete(Long id);
}