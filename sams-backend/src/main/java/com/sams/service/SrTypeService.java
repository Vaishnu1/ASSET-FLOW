package com.sams.service;

import com.sams.dto.SrTypeDTO;
import java.util.List;

public interface SrTypeService {
    SrTypeDTO create(SrTypeDTO dto);
    SrTypeDTO getById(Long id);
    List<SrTypeDTO> getAll();
    SrTypeDTO update(Long id, SrTypeDTO dto);
    void delete(Long id);
}