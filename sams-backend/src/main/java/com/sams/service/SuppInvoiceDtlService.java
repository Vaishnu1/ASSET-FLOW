package com.sams.service;

import com.sams.dto.SuppInvoiceDtlDTO;
import java.util.List;

public interface SuppInvoiceDtlService {
    SuppInvoiceDtlDTO create(SuppInvoiceDtlDTO dto);
    SuppInvoiceDtlDTO getById(Long id);
    List<SuppInvoiceDtlDTO> getAll();
    SuppInvoiceDtlDTO update(Long id, SuppInvoiceDtlDTO dto);
    void delete(Long id);
}