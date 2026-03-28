package com.sams.service;

import com.sams.dto.SupplierModelSuppliedDTO;
import java.util.List;

public interface SupplierModelSuppliedService {
    SupplierModelSuppliedDTO createSupplierModelSupplied(SupplierModelSuppliedDTO dto);
    SupplierModelSuppliedDTO getSupplierModelSuppliedById(Long id);
    List<SupplierModelSuppliedDTO> getAllSupplierModelSupplieds();
    SupplierModelSuppliedDTO updateSupplierModelSupplied(Long id, SupplierModelSuppliedDTO dto);
    void deleteSupplierModelSupplied(Long id);
}