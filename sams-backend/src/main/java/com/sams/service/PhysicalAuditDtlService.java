package com.sams.service;

import com.sams.dto.PhysicalAuditDtlDTO;
import java.util.List;

public interface PhysicalAuditDtlService {
    PhysicalAuditDtlDTO create(PhysicalAuditDtlDTO dto);
    PhysicalAuditDtlDTO getById(Long id);
    List<PhysicalAuditDtlDTO> getAll();
    PhysicalAuditDtlDTO update(Long id, PhysicalAuditDtlDTO dto);
    void delete(Long id);
}