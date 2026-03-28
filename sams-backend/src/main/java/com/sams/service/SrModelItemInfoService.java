package com.sams.service;

import com.sams.dto.SrModelItemInfoDTO;
import java.util.List;

public interface SrModelItemInfoService {
    SrModelItemInfoDTO create(SrModelItemInfoDTO dto);
    SrModelItemInfoDTO getById(Long id);
    List<SrModelItemInfoDTO> getAll();
    SrModelItemInfoDTO update(Long id, SrModelItemInfoDTO dto);
    void delete(Long id);
}