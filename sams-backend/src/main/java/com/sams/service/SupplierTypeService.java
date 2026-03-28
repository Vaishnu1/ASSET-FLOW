package com.sams.service;

import com.sams.dto.SupplierTypeDTO;
import java.util.List;

public interface SupplierTypeService {
    SupplierTypeDTO create(SupplierTypeDTO dto);
    SupplierTypeDTO getById(Long id);
    List<SupplierTypeDTO> getAll();
    SupplierTypeDTO update(Long id, SupplierTypeDTO dto);
    void delete(Long id);
}