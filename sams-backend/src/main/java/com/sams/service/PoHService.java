package com.sams.service;

import com.sams.dto.PoHDTO;
import java.util.List;

public interface PoHService {
    PoHDTO create(PoHDTO dto);
    PoHDTO getById(Long id);
    List<PoHDTO> getAll();
    PoHDTO update(Long id, PoHDTO dto);
    void delete(Long id);
}