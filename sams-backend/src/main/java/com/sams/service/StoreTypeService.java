package com.sams.service;

import com.sams.dto.StoreTypeDTO;
import java.util.List;

public interface StoreTypeService {
    StoreTypeDTO create(StoreTypeDTO dto);
    StoreTypeDTO getById(Long id);
    List<StoreTypeDTO> getAll();
    StoreTypeDTO update(Long id, StoreTypeDTO dto);
    void delete(Long id);
}