package com.sams.service;

import com.sams.dto.WorkFlowEmailTemplateDTO;
import java.util.List;

public interface WorkFlowEmailTemplateService {
    WorkFlowEmailTemplateDTO create(WorkFlowEmailTemplateDTO dto);
    WorkFlowEmailTemplateDTO getById(Long id);
    List<WorkFlowEmailTemplateDTO> getAll();
    WorkFlowEmailTemplateDTO update(Long id, WorkFlowEmailTemplateDTO dto);
    void delete(Long id);
}