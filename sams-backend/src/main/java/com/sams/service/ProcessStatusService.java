package com.sams.service;

import com.sams.dto.ProcessStatusDTO;
import java.util.List;

public interface ProcessStatusService {
    ProcessStatusDTO create(ProcessStatusDTO dto);
    ProcessStatusDTO getById(Long id);
    List<ProcessStatusDTO> getAll();
    ProcessStatusDTO update(Long id, ProcessStatusDTO dto);
    void delete(Long id);
}