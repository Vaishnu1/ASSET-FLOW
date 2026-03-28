package com.sams.service;

import com.sams.dto.SrTatTempDTO;
import java.util.List;

public interface SrTatTempService {
    SrTatTempDTO create(SrTatTempDTO dto);
    SrTatTempDTO getById(Long id);
    List<SrTatTempDTO> getAll();
    SrTatTempDTO update(Long id, SrTatTempDTO dto);
    void delete(Long id);
}