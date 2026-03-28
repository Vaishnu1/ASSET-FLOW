package com.sams.service;

import com.sams.dto.WorkFlowHierarchyHdrDTO;
import java.util.List;

public interface WorkFlowHierarchyHdrService {
    WorkFlowHierarchyHdrDTO create(WorkFlowHierarchyHdrDTO dto);
    WorkFlowHierarchyHdrDTO getById(Long id);
    List<WorkFlowHierarchyHdrDTO> getAll();
    WorkFlowHierarchyHdrDTO update(Long id, WorkFlowHierarchyHdrDTO dto);
    void delete(Long id);
}