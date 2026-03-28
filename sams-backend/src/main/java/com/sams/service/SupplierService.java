package com.sams.service;

import com.sams.dto.SupplierDTO;
import java.util.List;

public interface SupplierService {
    SupplierDTO createSupplier(SupplierDTO dto);
    SupplierDTO getSupplierById(Long id);
    List<SupplierDTO> getAllSuppliers();
    SupplierDTO updateSupplier(Long id, SupplierDTO dto);
    void deleteSupplier(Long id);
}