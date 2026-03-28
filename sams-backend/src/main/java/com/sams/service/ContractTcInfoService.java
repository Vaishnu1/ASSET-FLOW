package com.sams.service;

import com.sams.dto.ContractTcInfoDTO;
import java.util.List;

public interface ContractTcInfoService {
    ContractTcInfoDTO create(ContractTcInfoDTO dto);
    ContractTcInfoDTO getById(Long id);
    List<ContractTcInfoDTO> getAll();
    ContractTcInfoDTO update(Long id, ContractTcInfoDTO dto);
    void delete(Long id);
}