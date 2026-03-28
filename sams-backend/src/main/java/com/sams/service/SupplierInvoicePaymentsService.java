package com.sams.service;

import com.sams.dto.SupplierInvoicePaymentsDTO;
import java.util.List;

public interface SupplierInvoicePaymentsService {
    SupplierInvoicePaymentsDTO create(SupplierInvoicePaymentsDTO dto);
    SupplierInvoicePaymentsDTO getById(Long id);
    List<SupplierInvoicePaymentsDTO> getAll();
    SupplierInvoicePaymentsDTO update(Long id, SupplierInvoicePaymentsDTO dto);
    void delete(Long id);
}