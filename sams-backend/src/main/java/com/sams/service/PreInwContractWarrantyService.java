package com.sams.service;

import com.sams.dto.PreInwContractWarrantyDTO;
import java.util.List;

public interface PreInwContractWarrantyService {
    PreInwContractWarrantyDTO create(PreInwContractWarrantyDTO dto);
    PreInwContractWarrantyDTO getById(Long id);
    List<PreInwContractWarrantyDTO> getAll();
    PreInwContractWarrantyDTO update(Long id, PreInwContractWarrantyDTO dto);
    void delete(Long id);
}