package com.sams.service;

import com.sams.dto.ContractWarrantyDTO;
import java.util.List;

public interface ContractWarrantyService {
    ContractWarrantyDTO create(ContractWarrantyDTO dto);
    ContractWarrantyDTO getById(Long id);
    List<ContractWarrantyDTO> getAll();
    ContractWarrantyDTO update(Long id, ContractWarrantyDTO dto);
    void delete(Long id);
}