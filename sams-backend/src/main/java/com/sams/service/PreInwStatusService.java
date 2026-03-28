package com.sams.service;

import com.sams.dto.PreInwStatusDTO;
import java.util.List;

public interface PreInwStatusService {
    PreInwStatusDTO create(PreInwStatusDTO dto);
    PreInwStatusDTO getById(Long id);
    List<PreInwStatusDTO> getAll();
    PreInwStatusDTO update(Long id, PreInwStatusDTO dto);
    void delete(Long id);
}