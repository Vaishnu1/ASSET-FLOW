package com.sams.service;

import com.sams.dto.PoDDTO;
import java.util.List;

public interface PoDService {
    PoDDTO create(PoDDTO dto);
    PoDDTO getById(Long id);
    List<PoDDTO> getAll();
    PoDDTO update(Long id, PoDDTO dto);
    void delete(Long id);
}