package com.sams.service;

import com.sams.dto.BatchHdrDTO;
import java.util.List;

public interface BatchHdrService {
    BatchHdrDTO create(BatchHdrDTO dto);
    BatchHdrDTO getById(Long id);
    List<BatchHdrDTO> getAll();
    BatchHdrDTO update(Long id, BatchHdrDTO dto);
    void delete(Long id);
}