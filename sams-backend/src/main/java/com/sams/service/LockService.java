package com.sams.service;

import com.sams.dto.LockDTO;
import java.util.List;

public interface LockService {
    LockDTO create(LockDTO dto);
    LockDTO getById(Long id);
    List<LockDTO> getAll();
    LockDTO update(Long id, LockDTO dto);
    void delete(Long id);
}