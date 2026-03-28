package com.sams.service;

import com.sams.dto.SupplierSiteContactInfoDTO;
import java.util.List;

public interface SupplierSiteContactInfoService {
    SupplierSiteContactInfoDTO create(SupplierSiteContactInfoDTO dto);
    SupplierSiteContactInfoDTO getById(Long id);
    List<SupplierSiteContactInfoDTO> getAll();
    SupplierSiteContactInfoDTO update(Long id, SupplierSiteContactInfoDTO dto);
    void delete(Long id);
}