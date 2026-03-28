package com.sams.service;

import com.sams.dto.BatchDtlDTO;
import java.util.List;

public interface BatchDtlService {
    BatchDtlDTO create(BatchDtlDTO dto);
    BatchDtlDTO getById(Long id);
    List<BatchDtlDTO> getAll();
    BatchDtlDTO update(Long id, BatchDtlDTO dto);
    void delete(Long id);
}