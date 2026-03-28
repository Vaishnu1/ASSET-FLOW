package com.sams.service;

import com.sams.dto.AssetAuditStatusDTO;
import java.util.List;

public interface AssetAuditStatusService {
    AssetAuditStatusDTO create(AssetAuditStatusDTO dto);
    AssetAuditStatusDTO getById(Long id);
    List<AssetAuditStatusDTO> getAll();
    AssetAuditStatusDTO update(Long id, AssetAuditStatusDTO dto);
    void delete(Long id);
}