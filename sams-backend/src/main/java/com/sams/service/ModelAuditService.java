package com.sams.service;

import com.sams.dto.ModelAuditDTO;
import java.util.List;

public interface ModelAuditService {
    ModelAuditDTO create(ModelAuditDTO dto);
    ModelAuditDTO getById(Long id);
    List<ModelAuditDTO> getAll();
    ModelAuditDTO update(Long id, ModelAuditDTO dto);
    void delete(Long id);
}