package com.sams.service;

import com.sams.dto.TransactionActivityDTO;
import java.util.List;

public interface TransactionActivityService {
    TransactionActivityDTO create(TransactionActivityDTO dto);
    TransactionActivityDTO getById(Long id);
    List<TransactionActivityDTO> getAll();
    TransactionActivityDTO update(Long id, TransactionActivityDTO dto);
    void delete(Long id);
}