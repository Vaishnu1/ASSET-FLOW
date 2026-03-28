package com.sams.service;

import com.sams.dto.WarehouseTypeDTO;
import java.util.List;

public interface WarehouseTypeService {
    WarehouseTypeDTO create(WarehouseTypeDTO dto);
    WarehouseTypeDTO getById(Long id);
    List<WarehouseTypeDTO> getAll();
    WarehouseTypeDTO update(Long id, WarehouseTypeDTO dto);
    void delete(Long id);
}