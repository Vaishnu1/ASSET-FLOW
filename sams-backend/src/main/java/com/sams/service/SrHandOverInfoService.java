package com.sams.service;

import com.sams.dto.SrHandOverInfoDTO;
import java.util.List;

public interface SrHandOverInfoService {
    SrHandOverInfoDTO create(SrHandOverInfoDTO dto);
    SrHandOverInfoDTO getById(Long id);
    List<SrHandOverInfoDTO> getAll();
    SrHandOverInfoDTO update(Long id, SrHandOverInfoDTO dto);
    void delete(Long id);
}