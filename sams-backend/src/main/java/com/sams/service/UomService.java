package com.sams.service;

import com.sams.dto.UomDTO;
import java.util.List;

public interface UomService {
    UomDTO create(UomDTO dto);
    UomDTO getById(Long id);
    List<UomDTO> getAll();
    UomDTO update(Long id, UomDTO dto);
    void delete(Long id);
}