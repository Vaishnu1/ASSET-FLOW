package com.sams.service;

import com.sams.dto.SupplierSiteRegDTO;
import java.util.List;

public interface SupplierSiteRegService {
    SupplierSiteRegDTO createSupplierSiteReg(SupplierSiteRegDTO dto);
    SupplierSiteRegDTO getSupplierSiteRegById(Long id);
    List<SupplierSiteRegDTO> getAllSupplierSiteRegs();
    SupplierSiteRegDTO updateSupplierSiteReg(Long id, SupplierSiteRegDTO dto);
    void deleteSupplierSiteReg(Long id);
}