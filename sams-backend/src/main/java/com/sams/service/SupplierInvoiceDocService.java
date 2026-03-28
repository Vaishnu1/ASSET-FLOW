package com.sams.service;

import com.sams.dto.SupplierInvoiceDocDTO;
import java.util.List;

public interface SupplierInvoiceDocService {
    SupplierInvoiceDocDTO create(SupplierInvoiceDocDTO dto);
    SupplierInvoiceDocDTO getById(Long id);
    List<SupplierInvoiceDocDTO> getAll();
    SupplierInvoiceDocDTO update(Long id, SupplierInvoiceDocDTO dto);
    void delete(Long id);
}