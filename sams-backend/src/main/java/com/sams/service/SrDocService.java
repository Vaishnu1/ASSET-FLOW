package com.sams.service;

import com.sams.dto.SrDocDTO;
import java.util.List;

public interface SrDocService {
    SrDocDTO create(SrDocDTO dto);
    SrDocDTO getById(Long id);
    List<SrDocDTO> getAll();
    SrDocDTO update(Long id, SrDocDTO dto);
    void delete(Long id);
}