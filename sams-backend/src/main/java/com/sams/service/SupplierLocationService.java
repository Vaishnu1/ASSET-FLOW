package com.sams.service;

import com.sams.dto.SupplierLocationDTO;
import java.util.List;

public interface SupplierLocationService {
    SupplierLocationDTO createSupplierLocation(SupplierLocationDTO dto);
    SupplierLocationDTO getSupplierLocationById(Long id);
    List<SupplierLocationDTO> getAllSupplierLocations();
    SupplierLocationDTO updateSupplierLocation(Long id, SupplierLocationDTO dto);
    void deleteSupplierLocation(Long id);
}