package com.sams.service;

import com.sams.dto.RtvHdrDTO;
import java.util.List;

public interface RtvHdrService {
    RtvHdrDTO create(RtvHdrDTO dto);
    RtvHdrDTO getById(Long id);
    List<RtvHdrDTO> getAll();
    RtvHdrDTO update(Long id, RtvHdrDTO dto);
    void delete(Long id);
}