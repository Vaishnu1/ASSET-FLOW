package com.sams.service;

import com.sams.dto.AssetAssigneeAuditOldDTO;
import java.util.List;

public interface AssetAssigneeAuditOldService {
    AssetAssigneeAuditOldDTO create(AssetAssigneeAuditOldDTO dto);
    AssetAssigneeAuditOldDTO getById(Long id);
    List<AssetAssigneeAuditOldDTO> getAll();
    AssetAssigneeAuditOldDTO update(Long id, AssetAssigneeAuditOldDTO dto);
    void delete(Long id);
}