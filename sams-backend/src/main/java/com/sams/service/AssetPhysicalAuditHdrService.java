package com.sams.service;

import com.sams.dto.AssetPhysicalAuditHdrDTO;
import java.util.List;

public interface AssetPhysicalAuditHdrService {
    AssetPhysicalAuditHdrDTO create(AssetPhysicalAuditHdrDTO dto);
    AssetPhysicalAuditHdrDTO getById(Long id);
    List<AssetPhysicalAuditHdrDTO> getAll();
    AssetPhysicalAuditHdrDTO update(Long id, AssetPhysicalAuditHdrDTO dto);
    void delete(Long id);
}