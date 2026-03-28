package com.sams.service;

import com.sams.dto.AssetPhysicalAuditDtlDTO;
import java.util.List;

public interface AssetPhysicalAuditDtlService {
    AssetPhysicalAuditDtlDTO create(AssetPhysicalAuditDtlDTO dto);
    AssetPhysicalAuditDtlDTO getById(Long id);
    List<AssetPhysicalAuditDtlDTO> getAll();
    AssetPhysicalAuditDtlDTO update(Long id, AssetPhysicalAuditDtlDTO dto);
    void delete(Long id);
}