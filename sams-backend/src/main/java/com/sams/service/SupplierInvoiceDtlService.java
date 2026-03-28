package com.sams.service;

import com.sams.dto.SupplierInvoiceDtlDTO;
import java.util.List;

public interface SupplierInvoiceDtlService {
    SupplierInvoiceDtlDTO create(SupplierInvoiceDtlDTO dto);
    SupplierInvoiceDtlDTO getById(Long id);
    List<SupplierInvoiceDtlDTO> getAll();
    SupplierInvoiceDtlDTO update(Long id, SupplierInvoiceDtlDTO dto);
    void delete(Long id);
}