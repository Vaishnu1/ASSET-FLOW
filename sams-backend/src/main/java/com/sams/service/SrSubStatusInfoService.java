package com.sams.service;

import com.sams.dto.SrSubStatusInfoDTO;
import java.util.List;

public interface SrSubStatusInfoService {
    SrSubStatusInfoDTO create(SrSubStatusInfoDTO dto);
    SrSubStatusInfoDTO getById(Long id);
    List<SrSubStatusInfoDTO> getAll();
    SrSubStatusInfoDTO update(Long id, SrSubStatusInfoDTO dto);
    void delete(Long id);
}