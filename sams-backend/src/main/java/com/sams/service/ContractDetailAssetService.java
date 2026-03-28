package com.sams.service;

import com.sams.dto.ContractDetailAssetDTO;
import java.util.List;

public interface ContractDetailAssetService {
    ContractDetailAssetDTO createContractDetailAsset(ContractDetailAssetDTO dto);
    ContractDetailAssetDTO getContractDetailAssetById(Long id);
    List<ContractDetailAssetDTO> getAllContractDetailAssets();
    ContractDetailAssetDTO updateContractDetailAsset(Long id, ContractDetailAssetDTO dto);
    void deleteContractDetailAsset(Long id);
}