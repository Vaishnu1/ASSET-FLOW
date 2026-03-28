package com.sams.service;

import com.sams.dto.SupplierInvoiceHdrDTO;
import java.util.List;

public interface SupplierInvoiceHdrService {
    SupplierInvoiceHdrDTO create(SupplierInvoiceHdrDTO dto);
    SupplierInvoiceHdrDTO getById(Long id);
    List<SupplierInvoiceHdrDTO> getAll();
    SupplierInvoiceHdrDTO update(Long id, SupplierInvoiceHdrDTO dto);
    void delete(Long id);
}