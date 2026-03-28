package com.sams.service;

import com.sams.dto.EndUserDTO;
import java.util.List;

public interface EndUserService {
    EndUserDTO create(EndUserDTO dto);
    EndUserDTO getById(Long id);
    List<EndUserDTO> getAll();
    EndUserDTO update(Long id, EndUserDTO dto);
    void delete(Long id);
}