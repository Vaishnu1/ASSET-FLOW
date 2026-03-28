package com.sams.service;

import com.sams.dto.ContractDocDTO;
import java.util.List;

public interface ContractDocService {
    ContractDocDTO create(ContractDocDTO dto);
    ContractDocDTO getById(Long id);
    List<ContractDocDTO> getAll();
    ContractDocDTO update(Long id, ContractDocDTO dto);
    void delete(Long id);
}