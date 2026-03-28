package com.sams.service;

import com.sams.dto.WorkFlowProcessStatusDTO;
import java.util.List;

public interface WorkFlowProcessStatusService {
    WorkFlowProcessStatusDTO create(WorkFlowProcessStatusDTO dto);
    WorkFlowProcessStatusDTO getById(Long id);
    List<WorkFlowProcessStatusDTO> getAll();
    WorkFlowProcessStatusDTO update(Long id, WorkFlowProcessStatusDTO dto);
    void delete(Long id);
}