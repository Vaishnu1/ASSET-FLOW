package com.sams.service;

import com.sams.dto.SupplierInvoiceTcInfoDTO;
import java.util.List;

public interface SupplierInvoiceTcInfoService {
    SupplierInvoiceTcInfoDTO create(SupplierInvoiceTcInfoDTO dto);
    SupplierInvoiceTcInfoDTO getById(Long id);
    List<SupplierInvoiceTcInfoDTO> getAll();
    SupplierInvoiceTcInfoDTO update(Long id, SupplierInvoiceTcInfoDTO dto);
    void delete(Long id);
}