package com.sams.service;

import com.sams.dto.AssetAssigneeAuditDTO;
import java.util.List;

public interface AssetAssigneeAuditService {
    AssetAssigneeAuditDTO create(AssetAssigneeAuditDTO dto);
    AssetAssigneeAuditDTO getById(Long id);
    List<AssetAssigneeAuditDTO> getAll();
    AssetAssigneeAuditDTO update(Long id, AssetAssigneeAuditDTO dto);
    void delete(Long id);
}