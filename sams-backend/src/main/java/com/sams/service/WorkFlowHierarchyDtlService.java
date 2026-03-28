package com.sams.service;

import com.sams.dto.WorkFlowHierarchyDtlDTO;
import java.util.List;

public interface WorkFlowHierarchyDtlService {
    WorkFlowHierarchyDtlDTO create(WorkFlowHierarchyDtlDTO dto);
    WorkFlowHierarchyDtlDTO getById(Long id);
    List<WorkFlowHierarchyDtlDTO> getAll();
    WorkFlowHierarchyDtlDTO update(Long id, WorkFlowHierarchyDtlDTO dto);
    void delete(Long id);
}