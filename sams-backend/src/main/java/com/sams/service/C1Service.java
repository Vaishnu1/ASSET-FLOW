package com.sams.service;

import com.sams.dto.C1DTO;
import java.util.List;

public interface C1Service {
    C1DTO create(C1DTO dto);
    C1DTO getById(Long id);
    List<C1DTO> getAll();
    C1DTO update(Long id, C1DTO dto);
    void delete(Long id);
}