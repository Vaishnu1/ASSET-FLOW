package com.sams.service;

import com.sams.dto.AssetInfoAuditDTO;
import java.util.List;

public interface AssetInfoAuditService {
    AssetInfoAuditDTO create(AssetInfoAuditDTO dto);
    AssetInfoAuditDTO getById(Long id);
    List<AssetInfoAuditDTO> getAll();
    AssetInfoAuditDTO update(Long id, AssetInfoAuditDTO dto);
    void delete(Long id);
}