package com.sams.service;

import com.sams.dto.SrActivityDocDTO;
import java.util.List;

public interface SrActivityDocService {
    SrActivityDocDTO create(SrActivityDocDTO dto);
    SrActivityDocDTO getById(Long id);
    List<SrActivityDocDTO> getAll();
    SrActivityDocDTO update(Long id, SrActivityDocDTO dto);
    void delete(Long id);
}