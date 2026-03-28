package com.sams.service;

import com.sams.dto.WorkFlowProcessDTO;
import java.util.List;

public interface WorkFlowProcessService {
    WorkFlowProcessDTO create(WorkFlowProcessDTO dto);
    WorkFlowProcessDTO getById(Long id);
    List<WorkFlowProcessDTO> getAll();
    WorkFlowProcessDTO update(Long id, WorkFlowProcessDTO dto);
    void delete(Long id);
}