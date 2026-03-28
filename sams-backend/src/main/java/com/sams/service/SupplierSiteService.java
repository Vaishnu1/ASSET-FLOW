package com.sams.service;

import com.sams.dto.SupplierSiteDTO;
import java.util.List;

public interface SupplierSiteService {
    SupplierSiteDTO create(SupplierSiteDTO dto);
    SupplierSiteDTO getById(Long id);
    List<SupplierSiteDTO> getAll();
    SupplierSiteDTO update(Long id, SupplierSiteDTO dto);
    void delete(Long id);
}