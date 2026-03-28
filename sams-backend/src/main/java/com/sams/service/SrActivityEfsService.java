package com.sams.service;

import com.sams.dto.SrActivityEfsDTO;
import java.util.List;

public interface SrActivityEfsService {
    SrActivityEfsDTO create(SrActivityEfsDTO dto);
    SrActivityEfsDTO getById(Long id);
    List<SrActivityEfsDTO> getAll();
    SrActivityEfsDTO update(Long id, SrActivityEfsDTO dto);
    void delete(Long id);
}