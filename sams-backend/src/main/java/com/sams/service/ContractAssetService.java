package com.sams.service;

import com.sams.dto.ContractAssetDTO;
import java.util.List;

public interface ContractAssetService {
    ContractAssetDTO create(ContractAssetDTO dto);
    ContractAssetDTO getById(Long id);
    List<ContractAssetDTO> getAll();
    ContractAssetDTO update(Long id, ContractAssetDTO dto);
    void delete(Long id);
}