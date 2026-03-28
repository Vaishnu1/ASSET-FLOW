package com.sams.service;

import com.sams.dto.AssetInfoAuditOldDTO;
import java.util.List;

public interface AssetInfoAuditOldService {
    AssetInfoAuditOldDTO create(AssetInfoAuditOldDTO dto);
    AssetInfoAuditOldDTO getById(Long id);
    List<AssetInfoAuditOldDTO> getAll();
    AssetInfoAuditOldDTO update(Long id, AssetInfoAuditOldDTO dto);
    void delete(Long id);
}