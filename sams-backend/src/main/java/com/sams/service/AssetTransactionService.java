package com.sams.service;

import com.sams.dto.AssetTransactionDTO;
import java.util.List;

public interface AssetTransactionService {
    AssetTransactionDTO create(AssetTransactionDTO dto);
    AssetTransactionDTO getById(Long id);
    List<AssetTransactionDTO> getAll();
    AssetTransactionDTO update(Long id, AssetTransactionDTO dto);
    void delete(Long id);
}