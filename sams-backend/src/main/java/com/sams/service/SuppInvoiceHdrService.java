package com.sams.service;

import com.sams.dto.SuppInvoiceHdrDTO;
import java.util.List;

public interface SuppInvoiceHdrService {
    SuppInvoiceHdrDTO create(SuppInvoiceHdrDTO dto);
    SuppInvoiceHdrDTO getById(Long id);
    List<SuppInvoiceHdrDTO> getAll();
    SuppInvoiceHdrDTO update(Long id, SuppInvoiceHdrDTO dto);
    void delete(Long id);
}