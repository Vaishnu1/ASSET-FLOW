package com.sams.service;

import com.sams.dto.WorkFlowDescriptionDTO;
import java.util.List;

public interface WorkFlowDescriptionService {
    WorkFlowDescriptionDTO create(WorkFlowDescriptionDTO dto);
    WorkFlowDescriptionDTO getById(Long id);
    List<WorkFlowDescriptionDTO> getAll();
    WorkFlowDescriptionDTO update(Long id, WorkFlowDescriptionDTO dto);
    void delete(Long id);
}