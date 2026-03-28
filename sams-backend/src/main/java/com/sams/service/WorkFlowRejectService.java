package com.sams.service;

import com.sams.dto.WorkFlowRejectDTO;
import java.util.List;

public interface WorkFlowRejectService {
    WorkFlowRejectDTO create(WorkFlowRejectDTO dto);
    WorkFlowRejectDTO getById(Long id);
    List<WorkFlowRejectDTO> getAll();
    WorkFlowRejectDTO update(Long id, WorkFlowRejectDTO dto);
    void delete(Long id);
}