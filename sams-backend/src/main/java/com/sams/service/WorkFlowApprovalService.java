package com.sams.service;

import com.sams.dto.WorkFlowApprovalDTO;
import java.util.List;

public interface WorkFlowApprovalService {
    WorkFlowApprovalDTO create(WorkFlowApprovalDTO dto);
    WorkFlowApprovalDTO getById(Long id);
    List<WorkFlowApprovalDTO> getAll();
    WorkFlowApprovalDTO update(Long id, WorkFlowApprovalDTO dto);
    void delete(Long id);
}