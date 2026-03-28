package com.sams.service;

import com.sams.dto.ManufacturerSupplierDTO;
import java.util.List;

public interface ManufacturerSupplierService {
    ManufacturerSupplierDTO create(ManufacturerSupplierDTO dto);
    ManufacturerSupplierDTO getById(Long id);
    List<ManufacturerSupplierDTO> getAll();
    ManufacturerSupplierDTO update(Long id, ManufacturerSupplierDTO dto);
    void delete(Long id);
}