package com.sams.service;

import com.sams.dto.ContractDTO;
import java.util.List;

public interface ContractService {
    ContractDTO create(ContractDTO dto);
    ContractDTO getById(Long id);
    List<ContractDTO> getAll();
    ContractDTO update(Long id, ContractDTO dto);
    void delete(Long id);
}