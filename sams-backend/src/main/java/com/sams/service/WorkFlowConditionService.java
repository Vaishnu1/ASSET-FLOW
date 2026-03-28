package com.sams.service;

import com.sams.dto.WorkFlowConditionDTO;
import java.util.List;

public interface WorkFlowConditionService {
    WorkFlowConditionDTO create(WorkFlowConditionDTO dto);
    WorkFlowConditionDTO getById(Long id);
    List<WorkFlowConditionDTO> getAll();
    WorkFlowConditionDTO update(Long id, WorkFlowConditionDTO dto);
    void delete(Long id);
}