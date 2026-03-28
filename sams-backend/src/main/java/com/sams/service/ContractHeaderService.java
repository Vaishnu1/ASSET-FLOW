package com.sams.service;

import com.sams.dto.ContractHeaderDTO;
import java.util.List;

public interface ContractHeaderService {
    ContractHeaderDTO createContractHeader(ContractHeaderDTO dto);
    ContractHeaderDTO getContractHeaderById(Long id);
    List<ContractHeaderDTO> getAllContractHeaders();
    ContractHeaderDTO updateContractHeader(Long id, ContractHeaderDTO dto);
    void deleteContractHeader(Long id);
}