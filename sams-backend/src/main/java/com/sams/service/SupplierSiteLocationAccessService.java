package com.sams.service;

import com.sams.dto.SupplierSiteLocationAccessDTO;
import java.util.List;

public interface SupplierSiteLocationAccessService {
    SupplierSiteLocationAccessDTO create(SupplierSiteLocationAccessDTO dto);
    SupplierSiteLocationAccessDTO getById(Long id);
    List<SupplierSiteLocationAccessDTO> getAll();
    SupplierSiteLocationAccessDTO update(Long id, SupplierSiteLocationAccessDTO dto);
    void delete(Long id);
}